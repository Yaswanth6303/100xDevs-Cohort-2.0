import { Router } from "express";
import userMiddleware from "../middleware/user.js";
import { User, Course } from "../db/index.js";

const router = Router();

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  User.create({
    username: username,
    password: password,
  })
    .then(function () {
      res.json({
        message: "User created successfully",
      });
    })
    .catch(function () {
      res.json({
        message: "User not created",
      });
    });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.json({
    message: "Courses in the site",
    courses: courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  try {
    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }

  res.json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    // Fetch user by username from headers
    const user = await User.findOne({ username: req.headers.username });

    // Check if user is found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch purchased courses for the user
    const purchasedCourses = await Course.find({
      _id: { $in: user.purchasedCourses },
    });

    // Send response with purchased courses
    res.json({
      message: "Purchased courses",
      purchasedCourses: purchasedCourses,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
