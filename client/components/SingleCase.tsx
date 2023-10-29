"use client";
import { AddCaseModal } from ".";
import { BsThreeDots } from "react-icons/bs";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Case } from "@/types/case";
import { useState } from "react";
type SingleCaseProps = {
  data: Case;
  sr_no: number;
  handleDeleteAfter: (id: string) => void;
};

const SingleCase = ({ data, sr_no, handleDeleteAfter }: SingleCaseProps) => {
  const { case_type, date, evidence, fir_no, status, priority_score } = data;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this case?");
    if (hasConfirmed) {
      try {
        const res = await fetch(`api/case/${data._id.toString()}`, {
          method: "DELETE",
        });
        if (res.ok) {
          handleDeleteAfter(data._id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div
        className={`${
          sr_no % 2 != 0 ? "bg-white" : "bg-[#fafafc]"
        } py-4 px-6 grid grid-cols-12`}
      >
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-black cursor-pointer col-span-1"
        >
          {sr_no}
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-black cursor-pointer col-span-3"
        >
          {case_type}
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-black cursor-pointer col-span-2"
        >
          {fir_no}
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-black cursor-pointer col-span-1"
        >
          {evidence ? "Yes" : "No"}
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-black cursor-pointer col-span-2"
        >
          {date}
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-[#407841]  col-span-1"
        >
          <span className="rounded-full px-4 text-center py-1 bg-[#96e497]">
            {status}
          </span>
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-sm font-semibold text-black cursor-pointer col-span-1"
        >
          {priority_score}
        </div>
        <div className="text-sm font-semibold text-black col-span-1 justify-self-end z-10">
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDots />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleDelete}>Mark Complete</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      {
        <AddCaseModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          type="view"
          data={data}
        />
      }
    </>
  );
};

export default SingleCase;
