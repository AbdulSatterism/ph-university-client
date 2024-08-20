import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/admin/UserManagement.api";
import { logout } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const res = await changePassword(data);
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password:" />
        <PHInput type="text" name="newPassword" label="New Password:" />
        <Button htmlType="submit">change password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
