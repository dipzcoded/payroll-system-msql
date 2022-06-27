import express from "express";
// import auth, { restrictAccessRoute } from "../../middlewares/auth.js";
import {
  createBank,
  deleteBank,
  getAllBanks,
  updateBank,
} from "../../controllers/bank.js";
// import { checkModelDataCached } from "../../middlewares/cache.js";

const router = express.Router();

// router.use(auth);
// router.use(restrictAccessRoute("Accountant", "HR", "Internal Auditor", "CEO"));
router.route("/").get(getAllBanks).post(createBank);
router.route("/:id").patch(updateBank).delete(deleteBank);

export default router;
