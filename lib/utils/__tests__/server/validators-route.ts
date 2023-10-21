import {
  apiRequestAuthLoginValidator,
  apiRequestAuthSignupValidator,
} from "@intellectia/utils/validators/api-request";
import { Router } from "express";

const router: Router = Router();

/**
 * For - apiRequestAuthLoginValidator
 */
router.post(
  "/apiRequestAuthLoginValidator",
  apiRequestAuthLoginValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * For - apiRequestAuthSignupValidator
 */

router.post(
  "/apiRequestAuthSignupValidator",
  apiRequestAuthSignupValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

export default router;
