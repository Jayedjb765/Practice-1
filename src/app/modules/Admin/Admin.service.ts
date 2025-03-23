import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './Admin.constant';
import { Admin } from './Admin.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

export const AdminServices = {
  getAllAdminsFromDB,
};
