import { useState } from "react";

type LessonStatus = "planned" | "completed" | "cancelled";

type Lesson = {
  id: number;
  title: string;
  teacher: string;
  status: LessonStatus;
};

const lessons: Lesson [] = [
  { id: 1, title: "Математика", teacher: "Анна", status: "planned" },
  { id: 2, title: "Английский", teacher: "Игорь", status: "completed" },
  { id: 3, title: "Физика", teacher: "Мария", status: "planned" },
  { id: 4, title: "История", teacher: "Анна", status: "cancelled" },
];

const statusLabels = {
  planned: "Запланировано",
  completed: "Завершено",
  cancelled: "Отменено",
};

function LessonsList() {
  let initialValue = "";
  let [value, setValue] = useState(initialValue);

  let filteredLessons = lessons.filter((lesson) => {
    return lesson.title.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Найти занятие"
      />

      {filteredLessons.length === 0 ? (
        <p> Занятия не найдены </p>
      ) : (
        <div>
          <h2>Уроки</h2>
          {filteredLessons.map((lesson) => {
            return (
              <section key={lesson.id}>
                <h3>{lesson.title}</h3>
                <p>{lesson.teacher}</p>
                <p>{statusLabels[lesson.status]}</p>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}

export default LessonsList;
