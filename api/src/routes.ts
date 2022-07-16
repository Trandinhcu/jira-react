import * as authentication from 'controllers/authentication';
import * as comments from 'controllers/comments';
import * as issues from 'controllers/issues';
import * as projects from 'controllers/projects';
import * as test from 'controllers/test';
import * as users from 'controllers/users';

export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {
    app.get('/reset-database', test.resetDatabase);
    app.get('/seed', test.createAccount);
  }

  app.post('/authentication', authentication.createGuestAccount);
};

export const attachPrivateRoutes = (app: any): void => {
  app.post('/comments', comments.create);
  app.put('/comments/:commentId', comments.update);
  app.delete('/comments/:commentId', comments.remove);

  app.get('/issues', issues.getProjectIssues);
  app.get('/issues/:issueId', issues.getIssueWithUsersAndComments);
  app.post('/issues', issues.create);
  app.put('/issues/:issueId', issues.update);
  app.delete('/issues/:issueId', issues.remove);

  app.get('/api/v1/projects', projects.index);
  app.post('/api/v1/projects', projects.store);
  app.put('/api/v1/projects/:id', projects.edit);
  app.delete('/api/v1/projects/:id', projects.remove);

  app.get('/api/v1/project', projects.getProjectWithUsersAndIssues);
  app.put('/project', projects.update);

  app.get('/api/v1/users', users.index);
  app.post('/api/v1/users', users.store);
  app.put('/api/v1/users/:id', users.edit);
  app.delete('/api/v1/users/:id', users.remove);

  app.get('/currentUser', users.getCurrentUser);
  app.put('/profile', users.updateProfile);
};
