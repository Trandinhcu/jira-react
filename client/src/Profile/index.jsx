import { Button, Card, Form, Input, message } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import ProjectSidebar from "Project/Sidebar";
import React, { Fragment, useEffect, useState } from "react";
import { ProjectsContainer} from './styles';
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "@/store/actions/User";
// import "./style.css";
// import Loading from "@/components/Loading";
// import { startActionWithPromise } from "@/helpers/saga-promise-helpers";


 const Profile = () =>  {
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState({
  });

  useEffect(() => {
    // setUser({ ...userInfo, password: user.password });
  }, []);

  const handlerInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handlerUpdateProfile = async () => {
    try {
    //   await startActionWithPromise(updateProfile, user, dispatch);
      message.success("Cập nhật thành công");
    } catch (error) {
      message.error("Cập nhật không thành công");
    }
  };

  return (
    <>
    <ProjectSidebar />
    <ProjectsContainer>
    <Fragment className="pt-3">
      <Card
        className="mx-auto text-center position-relative pt-5"
        style={{ width: 400 }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 py-5"
          style={{ background: "#74b9ff" }}
        ></div>
        <div>
          <Avatar
            className="custom-icon"
            size={80}
            style={{
              backgroundImage: `url(${userInfo.avatarUrl})`,
              backgroundPosition: "center",
              border: "2px solid #fff",
            }}
          >
            1231231
            {userInfo.name && userInfo.name.toUpperCase()}
          </Avatar>

          <h4 className="mt-1">{userInfo.name ? userInfo.name : "Mr Admin"}</h4>
        </div>
        <Form onFinish={handlerUpdateProfile}>
          <Form.Item
            name="email"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
            defaultValue={userInfo.email}
          >
            <div >
              <label className="floating-label">
                Email
              </label>
              <Input
                name="email"
                onChange={handlerInputChange}
                value={userInfo.email}
                disabled
              />
            </div>
          </Form.Item>
          <Form.Item
            name="name"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <div >
           
              <label   htmlFor={userInfo.name}  className="floating-label">
                
                Họ tên
              </label>
              <Input
                name="name"
                onChange={handlerInputChange}
                value={userInfo.name}
              />
            </div>
          </Form.Item>
    
          <Form.Item
            name="password"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <label className="floating-label">
              Mật khẩu
            </label>
            <Input.Password
              name="password"
              placeholder="*******"
              value={userInfo.password}
              onChange={handlerInputChange}
            />
          </Form.Item>
          <div className="d-flex justify-content-start pt-3">
            <Button htmlType="submit" type="primary">
              Cập nhật
            </Button>
          </div>
        </Form>
      </Card>
    </Fragment>
    </ProjectsContainer>

    </>
    
  );
}


export default Profile;