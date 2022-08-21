import React, { useState } from "react";
import CheckResult from "./CheckResult";
import UserCheck from "./UserCheck";

export default function Check() {
  // user data State
  const [users, setUsers] = useState("");

  // 조회 성공 allow
  const [allow, setAllow] = useState(false);

  return !allow ? (
    <UserCheck setAllow={setAllow} setUsers={setUsers} />
  ) : (
    <CheckResult users={users} />
  );
}
