import React from "react";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineDeleteForever,
} from "react-icons/md";
function ViewAction({ deleteUser, userId }) {
  return (
    <div className="flex flex-row gap-2">
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
        <MdOutlineDriveFileRenameOutline />
      </button>
      <button
        onClick={() => deleteUser(userId)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        <MdOutlineDeleteForever />
      </button>
    </div>
  );
}

export default ViewAction;
