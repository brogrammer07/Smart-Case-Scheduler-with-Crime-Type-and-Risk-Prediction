"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";
import { Case, CaseForm } from "@/types/case";
import { caseTypes } from "@/constants";
import { useSession } from "next-auth/react";
import OutlinedInput from "@mui/material/OutlinedInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  width: "40%",
};

type AddCaseModalProps = {
  open: boolean;
  handleClose: () => void;
  type: "view" | "add";
  data?: Case;
  handleAddAfter?: (data: Case) => void;
};

const AddCaseModal = ({
  open,
  handleClose,
  type,
  data,
  handleAddAfter,
}: AddCaseModalProps) => {
  const { data: session } = useSession();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<CaseForm>({
    case_type: "",
    date: "",
    evidence: false,
    fir_no: "",
    age: 0,
    material_damage: "",
    physical_damage: "",
    summary: "",
    time: "",
  });
  const resetForm = () => {
    setFormData({
      case_type: "",
      date: "",
      evidence: false,
      fir_no: "",
      age: 0,
      material_damage: "",
      physical_damage: "",
      summary: "",
      time: "",
    });
    handleClose();
  };

  const validateForm = () => {
    if (formData.fir_no === "") {
      setValidationError("Please enter FIR No.");
      return false;
    }

    if (formData.summary === "") {
      setValidationError("Please enter summary");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      console.log(formData);
      const formDataWithUser = {
        fir_no: formData.fir_no,
        summary: formData.summary,
        ps_code: session?.user?.name,
      };

      try {
        const response = await fetch("/api/case", {
          method: "POST",
          body: JSON.stringify(formDataWithUser),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Data", data);

          if (handleAddAfter) handleAddAfter(data);
          resetForm();
        }
      } catch (error) {
        console.log(error);
        setValidationError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (type === "view" && data) {
      setFormData(data);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Case
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
          {type == "add" && (
            <div className="">
              <InputLabel id="fir-no-label">FIR No.</InputLabel>
              <OutlinedInput
                className="w-full capitalize"
                id="fir-no"
                label="fir-no-label"
                placeholder="E.g. 288/23"
                value={formData.fir_no}
                onChange={(e) =>
                  setFormData({ ...formData, fir_no: e.target.value })
                }
              />
            </div>
          )}
          {type === "view" && (
            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <InputLabel id="fir-no-label">FIR No.</InputLabel>
                <OutlinedInput
                  className="w-full capitalize"
                  disabled={type === "view"}
                  id="fir-no"
                  label="fir-no-label"
                  placeholder="E.g. 288/23"
                  value={formData.fir_no}
                  onChange={(e) =>
                    setFormData({ ...formData, fir_no: e.target.value })
                  }
                />
              </div>
              <div className="">
                <InputLabel id="case-type-label">Case Type</InputLabel>
                <Select
                  disabled={true}
                  id="case-type"
                  labelId="case-type-label"
                  value={formData.case_type}
                  onChange={(e) =>
                    setFormData({ ...formData, case_type: e.target.value })
                  }
                  label="Case Type"
                  className="w-full capitalize"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {caseTypes.map((caseType) => (
                    <MenuItem key={caseType} value={caseType}>
                      {caseType}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="">
                <InputLabel id="date-label">Date</InputLabel>
                <OutlinedInput
                  disabled={true}
                  id="date"
                  label="date-label"
                  className="w-full capitalize"
                  placeholder=""
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="">
                <InputLabel id="time-label">Time</InputLabel>
                <OutlinedInput
                  disabled={true}
                  id="time"
                  label="time-label"
                  className="w-full capitalize"
                  placeholder=""
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
              <div className="">
                <InputLabel id="age-label">Age</InputLabel>
                <OutlinedInput
                  className="w-full capitalize"
                  disabled={true}
                  type="number"
                  id="age"
                  label="age-label"
                  placeholder="E.g. 23"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: parseInt(e.target.value) })
                  }
                />
              </div>

              <div className="">
                <InputLabel id="evidence-label">Evidence</InputLabel>
                <Select
                  className="w-full capitalize"
                  disabled={true}
                  value={formData.evidence ? "Yes" : "No"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      evidence: e.target.value === "Yes" ? true : false,
                    })
                  }
                  id="evidence"
                  label="evidence-label"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </div>

              <div className="">
                <InputLabel id="material-damage-label">
                  Material Damage
                </InputLabel>
                <OutlinedInput
                  className="w-full capitalize"
                  disabled={true}
                  id="material-damage-amount"
                  label="material-damage-label"
                  placeholder=""
                  value={formData.material_damage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      material_damage: e.target.value,
                    })
                  }
                />
              </div>

              <div className="">
                <InputLabel id="physical-damage-label">
                  Physical Damage
                </InputLabel>
                <OutlinedInput
                  className="w-full capitalize"
                  disabled={true}
                  id="physical-damage-duration"
                  label="physical-damage-label"
                  placeholder=""
                  value={formData.physical_damage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      physical_damage: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="">
            <InputLabel id="summary-label">Summary</InputLabel>
            <OutlinedInput
              className="w-full "
              disabled={type === "view"}
              rows={3}
              multiline
              id="summary"
              label="summary-label"
              placeholder="E.g. 288/23"
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
          </div>
          {validationError && (
            <p className="text-red-500 text-sm">{validationError}</p>
          )}
          <div className="flex items-center gap-2 self-end">
            {type === "add" ? (
              <>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 rounded-sm text-primary hover:bg-primaryDark hover:text-white  transition-colors border border-primary"
                  type="reset"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 rounded-sm bg-primary hover:bg-primaryDark transition-colors text-white"
                  type="submit"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-sm bg-primary hover:bg-primaryDark transition-colors text-white"
                type="button"
              >
                Close
              </button>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCaseModal;
