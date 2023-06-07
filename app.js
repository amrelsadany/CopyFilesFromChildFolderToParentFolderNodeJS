// import fs from "fs/promises";
import fs from "fs-extra";
import settings from "./appsettings.js";

var pathsList = [];

CopyFolders();

function CopyFolders() {
  return new Promise(async function () {
    const foldername = settings.MainFolder;
    var count = 0;
    const subfoldersList = await fs.readdir(foldername, {
      withFileTypes: true,
    });

    for (const subFolderItem of subfoldersList) {
      if (subFolderItem.isDirectory()) {
        var SubFolderPath = foldername + "\\" + subFolderItem.name;
        var subsubFolderList = await fs.readdir(SubFolderPath, {
          withFileTypes: true,
        });
        for (const subsubFolderItem of subsubFolderList) {
          if (subsubFolderItem.isDirectory()) {
            var subsubFolderPath = SubFolderPath + "\\" + subsubFolderItem.name;
            // console.log(subsubFolderPath);

            try {
              fs.copySync(subsubFolderPath, SubFolderPath);
              console.log(
                "Copy completed! for Folder:" + subsubFolderItem.name
              );
              fs.removeSync(subsubFolderPath);
              console.log("success!");
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    }
  });
}
