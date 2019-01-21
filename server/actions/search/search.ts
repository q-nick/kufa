import * as request from 'request';
import * as express from 'express';

function requestWithPromise(url:string):Promise<any> {
  return new Promise((resolve) => {
    request(url, (_:any, __:request.Response, body) => {
      resolve(JSON.parse(body));
    });
  });
}

async function searchBower(query:string):Promise<Search.Result> {
  const results = await requestWithPromise(`https://libraries.io/api/bower-search?q=${query}`);

  return results.map((result:any) => ({
    name: result.name,
    version: result.latest_release_number,
    score: result.stars,
    url: result.repository_url,
    description: result.description,
  }));
}

async function searchNPM(query:string):Promise<Search.Result> {
  const { results } = await requestWithPromise(`https://api.npms.io/v2/search?from=0&size=25&q=${query}`); // tslint:disable:max-line-length

  return results.map((result:any) => ({
    name: result.package.name,
    version: result.package.version,
    score: result.score.final,
    url: result.package.links.repository,
    description: result.package.description,
  }));
}

const methodsFor:{
  [key:string]: Function,
} = {
  bower: searchBower,
  npm: searchNPM,
};

export async function search(req:express.Request, res:express.Response):Promise<void> {
  const results = await methodsFor[req.params.repoName](req.body.query);
  res.json(results);
}
