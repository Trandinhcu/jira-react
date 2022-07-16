import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity, createEntity,deleteEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';



export const index = catchErrors(async (req, res) => {
  const { searchTerm, current = 1, pageSize = 5 } = req.query;

  let whereSQL = '1 = 1';
  if (searchTerm) {
    whereSQL += ' AND (project.name ILIKE :searchTerm OR project.description ILIKE :searchTerm)';
  }

  const query =  Project.createQueryBuilder('project')
                        .where(whereSQL, {  searchTerm: `%${searchTerm}%` });
  
  const projects = await query.orderBy('id','DESC')
                              .offset((current - 1) * pageSize)
                              .limit(pageSize)
                              .getMany();

  const total = await query.getCount();

  res.respond({ data: projects, total , current, pageSize});
});

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
    relations: ['users', 'issues'],
  });
  res.respond({
    project: {
      ...project,
      issues: project.issues.map(issuePartial),
    },
  });
});

export const store = catchErrors(async (req, res) => {
  const project = await createEntity(Project, req.body);
  res.respond({ project });
});

export const edit = catchErrors(async (req, res) => {
  const project = await updateEntity(Project, req.params.id, req.body);
  res.respond({ project });
});

export const remove = catchErrors(async (req, res) => {
  const project = await deleteEntity(Project, req.params.id);
  res.respond({ project });
});


export const update = catchErrors(async (req, res) => {
  const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  res.respond({ project });
});
