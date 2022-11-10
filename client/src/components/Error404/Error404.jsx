import React from "react";

import styles from "./Error404.module.css";

function Error404() {
  return (
    <div className={styles.errorBG}>
      <img
        className={styles.errorImg}
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0719cc36-5c34-4698-8af3-7cc928833469/d2we36f-fa37e46d-4fac-43f8-a38c-ff332d44da81.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA3MTljYzM2LTVjMzQtNDY5OC04YWYzLTdjYzkyODgzMzQ2OVwvZDJ3ZTM2Zi1mYTM3ZTQ2ZC00ZmFjLTQzZjgtYTM4Yy1mZjMzMmQ0NGRhODEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Mg2nC3Ab4t5eOJbaCQ7FuSlB3DfQuMY9wfNyq1y-Vk4"
        alt="404 Page does not exist"
      />
      <h1 className={styles.errorText}>ERROR 404: This page doesn't exist. </h1>
    </div>
  );
}

export default Error404;
