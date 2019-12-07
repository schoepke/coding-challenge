// const _ = require('lodash');

const URL_REGEX = /(https?):\/\/(www\.?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/igm;
// const PATH_REGEX = /\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/igm;
const BASE_REGEX =    /^\/?$/i;
const PATH_REGEX =    /^\/?(?:([^\/]+?))\/products\/(?:([^\/]+?))\/?$/i;
const COMPARE_REGEX = /^\/(?:([^\/]+?))\/products\/(?:([^\/]+?))\/compare\/(?:([^\/]+?))\/?$/i;
const IMAGES_REGEX =  /^\/(?:([^\/]+?))\/products\/(?:([^\/]+?))\/images\/?$/i;

class Resolver {
    parseURL(url) {
        // let match = URL_REGEX.exec(url);
        // if (match === null) throw Error('invalid URL');
        // console.log('match:', match);
        // return {
        //     scheme: match[1],
        //     host: match[2],
        //     path: match[3],
        // }
        const parsedURL = new URL(url);
        return {
            scheme: parsedURL.protocol,
            host: parsedURL.host,
            path: parsedURL.pathname,
        }
    }
    templateToRegex(template) {
        let parts = template.split('/');
        // console.log(parts);
        let regexParts = parts.map(part => {
            let p = '';
            if (part.length === 0) {
                p += '\\/?';
            } else if (part[0] === ':') {
                console.log('creating named capturing group for path parameter', part);
                let paramName = part.substring(1, part.length);
                p += `(?<${paramName}>[^\/]+)\\/`;
            } else {
                console.log('creating non-capturing group for fixed path segment', part);
                p += '([^\/]+)\\/';
            }
            return p;
        });
        // console.log(regexParts);
        let regex = '^' + regexParts.join('') + '?$';
        return regex;
    }
    matchPath(path, pathRegex) {
        console.log('trying to match path:', path, 'with template regex', pathRegex);
        let regex = new RegExp(pathRegex);
        let match = regex.exec(path);
        let { groups } = regex.exec(path);
        // console.log('match:', match);
        if (match === null) return {};
        console.log(match[1]);
        console.log(match[2]);
        console.log(Object.entries(groups));
        // return {
        //     scheme: match[1],
        //     host: match[2],
        //     path: match[3],
        // }
        return groups;
    }
}

const resolver = new Resolver();
// const urlSpec = resolver.parseURL('http://www.google.com');
// const urlSpec = resolver.parseURL('http://www.google.com/de?qp1=v1');
// const urlSpec = resolver.parseURL('https://www.google.com');
// const urlSpec = resolver.parseURL('https://www.expertlead.com');
// const urlSpec = resolver.parseURL('https://www.expertlead.com/de');
// const urlSpec = resolver.parseURL('https://www.expertlead.com/de/products');
const urlSpec = resolver.parseURL('https://www.expertlead.com/de/products/123');
console.log(urlSpec);
const templates = [
    '/',
    '/:lang',
    '/:lang/products',
    '/:lang/products/:id',
    '/:lang/products/:id/compare/:compareId',
    '/:lang/products/:id/images[/:imageId]',
];
let pathRegex = resolver.templateToRegex(templates[3]);
console.log(pathRegex);
const pathSpec = resolver.matchPath(urlSpec.path, pathRegex);
// console.log(pathSpec);
const res = Object.assign({}, urlSpec, { parameters: pathSpec });
console.log(res);