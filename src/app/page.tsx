import { TodoItem } from "@/components/TodoItem"
import { prisma } from "@/db"
import Link from "next/link"

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, completed: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { completed } })
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-center items-center p-10">
        <h1 className="text-3xl text-bold basis-1/3">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}