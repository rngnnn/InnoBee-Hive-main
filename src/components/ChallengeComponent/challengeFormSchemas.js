import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const challengeFormSchemas = [
  z.object({
    challengeTitle: z.string().nonempty("Challenge Title is required"),
    challengeCategory: z
      .array(z.string())
      .nonempty("At least one category is required"),
    featuredImage: z
      .instanceof(File)
      .nullable()
      .optional() // Add .optional() to allow initial null value
      .refine((file) => {
        if (file === null) {
          return false; // Make it required by returning false when null
        }
        return true;
      }, {
        message: "Featured Image is required",
      })
      .refine(
        (file) => file === null || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg and .png formats are supported."
      )
      .refine(
        (file) => file === null || file?.size <= 1 * 1024 * 1024,
        {
          message: "Maximum file size is 1 MB",
        }
      ),

    description: z.string().nonempty("Description is required"),
  }),
  z.object({
    problemStatement: z.string().optional(),
    currentSolutions: z.string().optional(),
    painPoint: z.string().optional(),
  }),
  z.object({
    prize: z.string().nonempty("Challenge Prize is required"),
  }),
  z
    .object({
      startDate: z
        .string()
        .nonempty("Challenge Start Date is required")
        .refine(
          (date) => {
            const selectedDate = new Date(date);
            const currentDate = new Date();
            const minDate = new Date(currentDate.getTime() + 9 * 60000);
            return selectedDate >= minDate;
          },
          {
            message:
              "Challenge Start Date must be at least 10 min after current time",
          }
        ),
      deadline: z.string().nonempty("Challenge Deadline is required"),
      judgingStart: z.string().nonempty("Judging Start Date is required"),
      judgingEnd: z.string().nonempty("Judging End Date is required"),
      winnerAnnouncement: z
        .string()
        .nonempty("Winner Announcement Date is required"),
    })

    .refine((data) => new Date(data.deadline) > new Date(data.startDate), {
      message: "Challenge deadline cannot be before challenge start date",
      path: ["deadline"],
    })
    .refine((data) => new Date(data.judgingStart) > new Date(data.deadline), {
      message: "Judging start date cannot be before challenge deadline",
      path: ["judgingStart"],
    })
    .refine((data) => new Date(data.judgingEnd) > new Date(data.judgingStart), {
      message: "Judging end date cannot be before judging start date",
      path: ["judgingEnd"],
    })
    .refine(
      (data) => new Date(data.winnerAnnouncement) > new Date(data.judgingEnd),
      {
        message: "Winner announcement date cannot be before judging end date",
        path: ["winnerAnnouncement"],
      }
    ),
];