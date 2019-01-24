import * as express from 'express';

import {
  getAllDependenciesSimple,
  getAllDependencies,
} from '../actions/dependencies/get/getProjectDependencies';

import {
  addDependencies,
} from '../actions/dependencies/add/addProjectDependencies';

import {
  deleteDependency,
} from '../actions/dependencies/delete/deleteProjectDependencies';

import {
  installDependencies,
  forceReinstallDependencies,
} from '../actions/dependencies/install/installProjectDependencies';

import { catchErrors } from '../catchErrors';

const dependenciesRouter = express.Router({ mergeParams: true }); // eslint-disable-line
dependenciesRouter.post('/:repoName/', catchErrors(addDependencies));
dependenciesRouter.delete('/:repoName/:packageName', catchErrors(deleteDependency));

const installRouter = express.Router({ mergeParams: true });
installRouter.post('/', catchErrors(installDependencies));
installRouter.post('/force', catchErrors(forceReinstallDependencies));

const getAllDependenciesRouter = express.Router({ mergeParams: true });
getAllDependenciesRouter.get('/', catchErrors(getAllDependencies));
getAllDependenciesRouter.get('/simple', catchErrors(getAllDependenciesSimple));

export {
  dependenciesRouter,
  installRouter,
  getAllDependenciesRouter,
};
