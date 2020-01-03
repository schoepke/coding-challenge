const OPTIONAL_PART_REGEXP = /\[[^\[\]]+\]/g; // matches all path params in square backets

const VALID_PATH_SEGMENTS = [
    'products',
    'compare',
    'images',
]

const VALID_PATH_PARAMETERS = [
    'lang',
    'id',
    'compareId',
    'imageId',
]

class Resolver {
    parseURL(url) {
        const parsedURL = new URL(url);
        return {
            scheme: parsedURL.protocol.slice(0, -1),
            host: parsedURL.host,
            path: parsedURL.pathname,
        }
    }
    filterOptionalParts(template) {
        return template.replace(OPTIONAL_PART_REGEXP, '');
    }
    templateToRegexp(template) {
        console.log('template:', template);
        if (template == null || template.trim().length === 0) throw Error('invalid route');
        const filteredTemplate = this.filterOptionalParts(template);
        console.log('filteredTemplate:', filteredTemplate);
        const parts = filteredTemplate.split('/');
        const regexParts = parts.map(part => {
            let p = '';
            if (part.length === 0) {
                p += '\\/?';
            } else if (part[0] === ':') {
                const paramName = part.slice(1);
                console.log('creating named capturing group for path parameter:', paramName);
                if (!VALID_PATH_PARAMETERS.includes(paramName)) throw Error(`invalid route path parameter: "${paramName}"`);
                p += `(?<${paramName}>[^\/]+)\\/`;
            } else {
                console.log('creating non-capturing group for fixed path segment:', part);
                if (!VALID_PATH_SEGMENTS.includes(part)) throw Error(`invalid route path segment: "${part}"`);
                p += '([^\/]+)\\/';
            }
            return p;
        });
        return '^' + regexParts.join('') + '?$';
    }
    matchPath(path, pathRegexp) {
        // console.log('trying to match path:', path, 'with template regexp', pathRegexp);
        const regexp = new RegExp(pathRegexp);
        const match = regexp.exec(path);
        // console.log('match:', match);
        return match ? { ...match.groups } : undefined;
    }
}

const resolver = new Resolver();
const urls = [
    'htt//www.invalid.url',
    'https://www.expertlead.com',
    'https://www.expertlead.com/',
    'https://www.expertlead.com/de',
    'https://www.expertlead.com/de/products',
    'https://www.expertlead.com/de/products/123',
    'https://www.expertlead.com/de/products/123/compare/456',
    'https://www.expertlead.com/de/products/123/images',
    'https://www.expertlead.com/de/products/123/images/789',
    'non-url-string', // 9
];
const templates = [
    '/',
    '/:lang',
    '/:lang/products',
    '/:lang/products/:id',
    '/:lang/products/:id/compare/:compareId',
    '/:lang/products/:id/images',
    '/:lang/products/:id/images[/:imageId]',
    '',
    ' ',
    null,
    undefined, // 10
    '/:lang/product/:id',
    '/:lang/products/:productId',
];
let res;
try {
    const urlSpec = resolver.parseURL(urls[6]);
    console.log(urlSpec);
    try {
        const pathRegexp = resolver.templateToRegexp(templates[4]);
        // console.log(pathRegexp);
        const pathParameters = resolver.matchPath(urlSpec.path, pathRegexp);
        console.log(pathParameters);
        res = pathParameters ? { ...urlSpec, ...{ parameters: pathParameters } } : {};
    } catch (err) {
        console.log(err);
        // throw Error('Route error: ' + err.message);
        res = {};
    }
} catch (err) {
    console.log(err);
    // throw Error('URL parse error: ' + err.message);
    res = {};
}
console.log(res);
// console.log(JSON.stringify(res));