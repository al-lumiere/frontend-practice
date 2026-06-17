import { useState } from "react";

type statusLabels = "planned" | "completed" | "canceled";

type Lesson = {
  id: number;
  title: string;
  teacher: string;
  status: statusLabels;
};

const initialLessons: Lesson[] = [
  { id: 1, title: "Математика", teacher: "Анна", status: "planned" },
  { id: 2, title: "Английский", teacher: "Игорь", status: "completed" },
];

const labels = {
  planned: "Запланировано",
  completed: "Завершено",
  canceled: "Отменено",
};

function LessonsManager() {
  let [lessons, setLessons] = useState(initialLessons);
  let [title, setTitle] = useState("");
  let [teacher, setTeacher] = useState("");
  let [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.length || !teacher.length) {
      setError("Заполните все поля");
      return;
    }

    let newLesson: Lesson = {
      id: initialLessons.length + 1,
      title: title,
      teacher: teacher,
      status: "planned",
    };

    setLessons([...lessons, newLesson]);
    setTitle("");
    setTeacher("");
    setError("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Название"
        />
        <input
          type="text"
          value={teacher}
          onChange={(event) => setTeacher(event.target.value)}
          placeholder="Преподаватель"
        />
        <button type="submit">Добавить занятие</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        <h2>Уроки</h2>

        {lessons.map((lesson) => (
          <section key={lesson.id}>
            <h3>{lesson.title}</h3>
            <p>{lesson.teacher}</p>
            <p>{labels[lesson.status]}</p>
          </section>
        ))}
      </div>
    </>
  );
}

export default LessonsManager;
