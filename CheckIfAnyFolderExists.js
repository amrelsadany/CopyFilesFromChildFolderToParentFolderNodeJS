import fs from "fs-extra";
import settings from "./appsettings.js";

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
        console.log(subFolderItem.name);
        count++;
      }
    }
  }
}

console.log(count);
