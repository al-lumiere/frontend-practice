import { useState } from "react";

type LessonStatus = "all" | "planned" | "completed" | "canceled";

type Lesson = {
  id: number;
  title: string;
  teacher: string;
  status: Exclude<LessonStatus, "all">;
};

const initialLessons: Lesson[] = [
  { id: 1, title: "Математика", teacher: "Анна", status: "planned" },
  { id: 2, title: "Английский", teacher: "Игорь", status: "completed" },
  { id: 3, title: "Физика", teacher: "Мария", status: "planned" },
  { id: 4, title: "История", teacher: "Анна", status: "canceled" },
];

const statusLabels: Record<LessonStatus, string> = {
  all: "Все",
  planned: "Запланировано",
  completed: "Завершено",
  canceled: "Отменено",
};

function LessonsByStatus() {
  const [activeStatus, setActiveStatus] = useState<LessonStatus>("all");

  const filteredLessons = initialLessons.filter((lesson) => {
    return activeStatus === "all" || lesson.status === activeStatus
  })

  function handleStatusClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const button = target.closest("button");

    if (!button) {
      return;
    }

    const status = button.dataset.status;

    if (
      status !== "all" &&
      status !== "planned" &&
      status !== "completed" &&
      status !== "canceled"
    ) {
      return;
    }

    setActiveStatus(status);
  }


  return (
    <>
    <div onClick={handleStatusClick}>
        <button type="button" data-status="all">
          Все
        </button>

        <button type="button" data-status="planned">
          Запланировано
        </button>

        <button type="button" data-status="completed">
          Завершено
        </button>

        <button type="button" data-status="canceled">
          Отменено
        </button>
      </div>

    {filteredLessons.length === 0 ? (
        <p> Занятий нет </p>
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
  )

}

export default LessonsByStatus;