import React from "react";
import { fireEvent, waitForElement, render } from "@testing-library/react";
import App from "../components/App";
import { TaskListContext } from "../context/TaskListContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Task from "../components/Task";

describe("Testando compomente Todo", () => {
  it(`Verificando se o input tem algum valor`, async () => {
    const { getByTestId } = render(
      <App>
        <TaskListContext.Provider>
          <TaskForm />
        </TaskListContext.Provider>
      </App>
    );
    const fieldNode = await waitForElement(() => getByTestId("form-field"));
    const newTask = "testing";
    fireEvent.change(fieldNode, { target: { value: newTask } });
    expect(fieldNode.value).toEqual(newTask);

    const btnNode = await waitForElement(() => getByTestId("form-btn"));
    fireEvent.click(btnNode);
  });

  it(`Verificando se o botão dispara o evento submit`, async () => {
    const { getByTestId } = render(
      <App>
        <TaskListContext.Provider>
          <TaskForm />
        </TaskListContext.Provider>
      </App>
    );

    const btnNode = await waitForElement(() => getByTestId("form-btn"));
    fireEvent.click(btnNode);
  });

  it(`Verificando se a tarefa foi adicionada na lista`, async () => {
    const { getByText } = render(
      <App>
        <TaskListContext.Provider>
          <TaskList />
          <Task />
        </TaskListContext.Provider>
      </App>
    );

    const newTask = "testing";

    const listNode = await waitForElement(() => getByText(newTask));
    expect(listNode).toBeDefined();
  });
});
