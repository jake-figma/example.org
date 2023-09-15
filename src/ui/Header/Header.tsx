import { FC } from "react";

import { Button } from "ui";
import "./header.css";

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header: FC<HeaderProps> = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}) => (
  <header>
    <div className="storybook-header">
      <div>
        <h1>Acme</h1>
      </div>
      <div>
        {user ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button component="a" href="https://google.com" onClick={onLogout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onLogin}>Log in</Button>
            <Button onClick={onCreateAccount}>Sign up</Button>
          </>
        )}
      </div>
    </div>
  </header>
);
