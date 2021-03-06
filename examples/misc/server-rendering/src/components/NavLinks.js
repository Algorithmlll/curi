import React from "react";
import { Link } from "@curi/react-dom";

const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="Contact">Contact</Link>
        <ol>
          <li>
            <Link to="Contact Method" params={{ method: "phone" }}>
              By Phone
            </Link>
          </li>
        </ol>
      </li>
      <li>
        <Link to="Redirect">Redirect (to Home)</Link>
      </li>
    </ul>
  </nav>
);

export default NavLinks;
