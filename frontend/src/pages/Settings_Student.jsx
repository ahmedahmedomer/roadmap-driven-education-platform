import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline as InformationIcon } from "react-icons/io";
import { MdOutlineSecurity as SecurityIcon } from "react-icons/md";
import { BsPerson as Person } from "react-icons/bs";

import { General, Security, Account } from "../components";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import axios from "../apis/axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const SETTINGS_URL = "/student/setting";

function Setting_Student() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [selectedLink, setSelectedLink] = useState("general");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    education: "",
    birth_date: "",
    bio: "",
    country: "",
    city: "",
    currentPassword: "",
    newPassword: "",
    verifyNewPassword: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      first_name: auth.firstName == null ? "" : auth.firstName,
      last_name: auth.lastName == null ? "" : auth.lastName,
      education: auth.education == null ? "" : auth.education,
      email: auth.email == null ? "" : auth.email,
      bio: auth.bio == null ? "" : auth.bio,
      birth_date: auth.birthDate == null ? "" : auth.birthDate,
      country: auth.country == null ? "" : auth.country,
      city: auth.city == null ? "" : auth.city,
    }));
    setImage(
      auth.image == "http://localhost:5000/image/null" ? "" : auth.image
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    console.log([name], value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    for (const key in formData) formdata.append(key, formData[key]);
    try {
      const response = await axios.put(SETTINGS_URL, formdata, {
        headers: {
          token: localStorage.token,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(0);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const tabStyle =
    "p-[16px] w-[305px] gap-2 flex items-center rounded-[10px] tracking-tight hover:bg-blue-500 hover:text-light active:bg-accent";
  return (
    <form className="w-[1200px]" onSubmit={handleSubmit}>
      <h2 className="pb-[16px] font-semibold text-[48px] leading-l tracking-tight text-dark dark:text-light">
        Settings
      </h2>

      <div className="bg-secondary rounded-[10px] dark:bg-secondary-dark text-dark dark:text-light flex transition-all duration-1000 ease-in-out-back">
        <ul className="p-8 flex flex-col gap-8">
          <li>
            <Link
              className={`${tabStyle} ${
                selectedLink === "general" &&
                "bg-primary text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedLink("general")}
            >
              <InformationIcon className="text-3xl" />
              <span className="text-[24px]">General Information</span>
            </Link>
          </li>

          <li>
            <Link
              className={`${tabStyle} ${
                selectedLink === "security" &&
                "bg-primary text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedLink("security")}
            >
              <SecurityIcon className="text-3xl" />
              <span className="text-[24px]">Security</span>
            </Link>
          </li>

          <li>
            <Link
              className={`${tabStyle} ${
                selectedLink === "account" &&
                "bg-primary text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedLink("account")}
            >
              <Person className="text-3xl" />
              <span className="text-[24px]">Account</span>
            </Link>
          </li>
        </ul>

        {/* line */}
        <div className="border-l border-r border-dark/10 dark:border-light/10 my-8"></div>

        <div className="p-8 flex flex-col gap-8 flex-1 ">
          {selectedLink === "general" && (
            <General
              country={formData.country}
              city={formData.city}
              image={image}
              firstName={formData.first_name}
              lastName={formData.last_name}
              handleChange={handleChange}
              setImage={setImage}
            />
          )}
          {selectedLink === "security" && (
            <Security
              password={formData.currentPassword}
              newPassword={formData.newPassword}
              verifyPassword={formData.verifyNewPassword}
              handleChange={handleChange}
            />
          )}
          {selectedLink === "account" && (
            <Account
              firstName={formData.first_name}
              lastName={formData.last_name}
              education={formData.education}
              email={formData.email}
              bio={formData.bio}
              birthDate={formData.birth_date}
              handleChange={handleChange}
            />
          )}
          <button
            type="submit"
            className="self-end flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
          >
            Save Changes <Solid className="text-[25px]" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default Setting_Student;
