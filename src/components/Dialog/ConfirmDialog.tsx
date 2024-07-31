/* Imports */
import { memo } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create popup dialog component for confirmation message.
 *
 * @interface ConfirmDialogProps
 * @property {boolean} open - to open and close the dialog
 * @property {string|node} title - title for the dialog
 * @property {string|node} description - describing the confirmation message
 * @property {boolean} isSubmitting - to show the loading for button
 * @property {string} agreeText - text for 'Yes' button
 * @property {string} disagreeText - text for 'No' button
 * @property {function} onAgreeAction - action for 'Yes' button
 * @property {function} onDisAgreeAction - action for 'No' button
 */
export interface ConfirmDialogProps {
  open?: boolean;
  title?: string | React.ReactNode;
  description: string | React.ReactNode;
  emailExists?: boolean;
  isSubmitting?: boolean;
  agreeText?: string;
  agreeText2?: string;
  disagreeText?: string;
  agreeButton2?: boolean;
  disagreeButton?: boolean;
  onAgreeAction2?: () => void;
  onAgreeAction: () => void;
  onDisAgreeAction: () => void;
}

// ----------------------------------------------------------------------

/**
 * Popup dialog component for confirmation message
 *
 * @component
 * @param {boolean} open - to open and close the dialog
 * @param {string|node} title - title for the dialog
 * @param {string|node} description - describing the confirmation message
 * @param {boolean} emailExists - describing the email
 * @param {boolean} isSubmitting - to show the loading for button
 * @param {string} agreeText - text for 'Yes' button
 * @param {string} agreeText2 - text for 'Yes' button
 * @param {string} disagreeText - text for 'No' button
 * @param {string} disagreeButton - text for 'No' button
 * @param {string} agreeButton2 - text for 'No' button
 * @param {function} onAgreeAction - action for 'Yes' button
 * @param {function} onAgreeAction2 - action for 'Yes' button
 * @param {function} onDisAgreeAction - action for 'No' button
 * @returns {JSX.Element}
 */
const ConfirmDialog = ({
  open = false,
  title,
  description,
  emailExists = false,
  isSubmitting = false,
  agreeText = "Agree",
  agreeText2 = "",
  disagreeText = "Disagree",
  agreeButton2,
  disagreeButton,
  onAgreeAction,
  onAgreeAction2,
  onDisAgreeAction,
}: ConfirmDialogProps): JSX.Element => {
  /* Output */
  return (
    <Dialog fullWidth maxWidth="xs" open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {disagreeButton && (
          <Button
            data-testid="buttonDisagree"
            variant="outlined"
            size="small"
            onClick={onDisAgreeAction}
            sx={{
              "&:hover": {
                bgcolor: "#E5EAFC",
              },
            }}
          >
            {disagreeText}
          </Button>
        )}
        {agreeButton2 && (
          <LoadingButton
            data-testid="buttonAgree2"
            size="small"
            variant="contained"
            loading={isSubmitting}
            onClick={onAgreeAction2}
            sx={{
              "&:hover": {
                bgcolor: "#E5EAFC",
              },
            }}
          >
            {agreeText2}
          </LoadingButton>
        )}
        <LoadingButton
          data-testid="buttonAgree"
          size="small"
          variant="contained"
          loading={isSubmitting}
          onClick={onAgreeAction}
          sx={{
            "&:hover": {
              bgcolor: "#643DF6",
              color: "#000000",
            },
          }}
        >
          {agreeText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
