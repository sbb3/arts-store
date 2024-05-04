import { auth } from "auth";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();
      const user = session?.user;
      if (!user)
        throw new UploadThingError("You must be logged in to upload images");
      if (user?.role !== "admin")
        throw new UploadThingError("Only admins can upload images");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
};
