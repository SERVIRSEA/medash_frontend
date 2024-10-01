import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import BuildIcon from '@mui/icons-material/Build';
import ErrorIcon from '@mui/icons-material/Error'; // Import Error Icon
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import IconWithText from "../common/IconWithText";
import FormActions from "./FormActions";
import { feedbackModalCloseAtom } from "@/state";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import { feedbackService } from "@/services";

const FeedbackForm = () => {
  const [, setOpen] = useAtom(feedbackModalCloseAtom);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitReason, setVisitReason] = useState([]);
  const [satisfaction, setSatisfaction] = useState("");
  const [unachievedGoalReason, setUnachievedGoalReason] = useState([]);
  const [bugDescription, setBugDescription] = useState("");
  const [enhancementDescription, setEnhancementDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [showForm, setShowForm] = useState(true);
  
  // State for errors
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset errors
    setErrors({});
    setErrorMessage(""); // Reset error message on submit

    // Validation
    const newErrors = {};
    if (!visitReason.length) newErrors.visit_reason = "Reason for your visit is required."; 
    if (!satisfaction) newErrors.satisfaction = "Satisfaction level is required.";
    if (satisfaction === "Not Satisfied" && unachievedGoalReason.length === 0) {
      newErrors.unachieved_goal_reason = "Reason for not achieving goal is required.";
    }
    
    if (!isAnonymous) {
      if (!name) newErrors.name = "Name is required.";
      if (!email) newErrors.email = "Email is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if there are any
      return; // Stop the submission process
    }
    
    setLoading(true); // Show loader
    setShowForm(false); // Hide form

    const formData = {
      feedback: feedback || "N/A",
      visit_reason: visitReason.length ? visitReason : [], 
      satisfaction,
      unachieved_goal_reason: unachievedGoalReason.length ? unachievedGoalReason : [], 
      bug_description: bugDescription || "N/A", 
        enhancement_description: enhancementDescription || "N/A",
    };

    if (!isAnonymous) {
      formData.name = name;
      formData.email = email;
    }

    try {
      const response = await feedbackService.submitFeedback(formData);
      console.log(response);
      setSuccessMessage("Success! Thanks for your valuable feedback!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback. Please try again."); // Set error message
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const visitReasons = [
    "Accessing Landcover Dataset",
    "Getting Vegetation Information",
    "Checking Fire Hotspot/Burns",
    "Drought Information",
    "Deforestation Information",
    "Forest Gain/Loss Areas",
    "Crop Related Information",
  ];

  const unachievedGoalReasons = [
    "Outdated Data",
    "Low Data Accuracy",
    "Incorrect Information",
    "Difficult to Use",
    "Slow Data Loading",
    "Lack of Technical Info",
    "No User Guide",
    "Functionality Issues",
  ];

  return (
    <Box sx={{ mt: 2 }}>
      {showForm ? (
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">Feedback Type</FormLabel>
            <RadioGroup
              row
              aria-label="feedback-type"
              name="feedbackType"
              value={isAnonymous ? "anonymously" : "identified"}
              onChange={(e) => setIsAnonymous(e.target.value === "anonymously")}
            >
              <Tooltip title="Submit feedback without revealing your identity" arrow>
                <FormControlLabel
                  value="anonymously"
                  control={<Radio />}
                  label="Anonymously"
                />
              </Tooltip>
              <Tooltip title="Provide your name and email for identified feedback" arrow>
                <FormControlLabel
                  value="identified"
                  control={<Radio />}
                  label="Identified"
                />
              </Tooltip>
            </RadioGroup>
          </FormControl>

          {!isAnonymous && (
            <Box sx={{ my: 2 }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name} // Show error if it exists
                helperText={errors.name} // Display error message
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email} // Show error if it exists
                helperText={errors.email} // Display error message
              />
            </Box>
          )}

          {/* Multi-Select Dropdown for Visit Reasons */}
          <MultiSelectDropdown
            label="What was the reason for your visit?"
            options={visitReasons}
            value={visitReason}
            onChange={(e) => setVisitReason(e.target.value)}
            checkboxColor="#15803d"
            menuItemHoverColor="#f0fdf4"
            menuItemClickColor="#dcfce7"
            error={!!errors.visit_reason} // Show error if it exists
          />

          {errors.visit_reason && <Typography color="error">{errors.visit_reason}</Typography>} {/* Display error message */}

          {/* Satisfaction Radio with Emojis */}
          <FormControl component="fieldset" sx={{ my: 2 }}>
            <FormLabel>How satisfied are you with our services?</FormLabel>
            <RadioGroup
              row
              aria-label="satisfaction"
              name="satisfaction"
              value={satisfaction}
              onChange={(e) => {
                setSatisfaction(e.target.value);
                if (e.target.value !== "Not Satisfied") {
                  setUnachievedGoalReason([]); // Reset if satisfied
                }
              }}
            >
              <FormControlLabel value="Satisfied" control={<Radio />} label="😊 Satisfied" />
              <FormControlLabel value="Partially Satisfied" control={<Radio />} label="😐 Partially Satisfied" />
              <FormControlLabel value="Not Satisfied" control={<Radio />} label="😞 Not Satisfied" />
            </RadioGroup>
            {errors.satisfaction && <Typography color="error">{errors.satisfaction}</Typography>}
          </FormControl>

          {/* Multi-Select Dropdown for Reasons for Not Achieving Goals */}
          {satisfaction === "Not Satisfied" && (
            <MultiSelectDropdown
              label="What was the reason you could not achieve your goal?"
              options={unachievedGoalReasons}
              value={unachievedGoalReason}
              onChange={(e) => setUnachievedGoalReason(e.target.value)}
              checkboxColor="#b45309"
              menuItemHoverColor="#fefce8"
              menuItemClickColor="#fef3c7"
              error={!!errors.unachieved_goal_reason} // Show error if it exists
            />
          )}
          {errors.unachieved_goal_reason && <Typography color="error">{errors.unachieved_goal_reason}</Typography>}

          {/* Separate Bug and Enhancement/Improvement Sections */}
          <Box sx={{ my: 2 }}>
            <IconWithText
              icon={<BugReportIcon sx={{ color: '#d32f2f' }} />}
              title="Report a Bug"
              color="#d32f2f"
            />
            <TextField
              fullWidth
              label="Describe the Bug"
              multiline
              rows={3}
              variant="outlined"
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
            />
          </Box>

          <Box sx={{ my: 2 }}>
            <IconWithText
              icon={<BuildIcon sx={{ color: '#047857' }} />}
              title="Suggest an Enhancement or Improvement"
              color="#047857"
            />
            <TextField
              fullWidth
              label="Describe the Enhancement/Improvement"
              multiline
              rows={3}
              variant="outlined"
              value={enhancementDescription}
              onChange={(e) => setEnhancementDescription(e.target.value)}
            />
          </Box>

          <TextField
            fullWidth
            label="Additional Feedback"
            multiline
            rows={3}
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          {/* Loader */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}

          <FormActions handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
      ) : (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          {successMessage ? (
            <>
              <CheckCircleIcon sx={{ fontSize: 50, color: 'green' }} />
              <Typography sx={{ color: 'green', my: 2 }}>
                {successMessage}
              </Typography>
            </>
          ) : (
            <>
              <ErrorIcon sx={{ fontSize: 50, color: 'red' }} />
              <Typography sx={{ color: 'red', my: 2 }}>
                {errorMessage}
              </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FeedbackForm;