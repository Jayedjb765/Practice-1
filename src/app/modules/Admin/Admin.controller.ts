import catchAync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './Admin.service';
import httpStatus from 'http-status';
const getAllAdmins = catchAync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin is retrieved succesfully',
    data: result,
  });
});

const getSingleAdmin = catchAync(async (req, res) => {
  const { adminid } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(adminid);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  });
});

const updateAdmin = catchAync(async (req, res) => {
  const { adminid } = req.params;
  const result = await AdminServices.updateAdminIntoDB(adminid, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  });
});
export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
};
