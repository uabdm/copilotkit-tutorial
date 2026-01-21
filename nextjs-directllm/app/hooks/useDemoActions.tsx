"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { WeatherCard } from "../components/WeatherCard";
import { StockCard } from "../components/StockCard";
import { TaskCard } from "../components/TaskCard";

export function useDemoActions() {
  // Weather action - renders a weather card in the chat
  useCopilotAction({
    name: "showWeather",
    description: "Display weather information for a location. Use this when the user asks about weather.",
    parameters: [
      {
        name: "location",
        type: "string",
        description: "The city or location to show weather for",
        required: true,
      },
      {
        name: "temperature",
        type: "number",
        description: "Temperature in Fahrenheit (generate a realistic value)",
        required: true,
      },
      {
        name: "condition",
        type: "string",
        description: "Weather condition: sunny, cloudy, rainy, snowy, or stormy",
        required: true,
      },
      {
        name: "humidity",
        type: "number",
        description: "Humidity percentage (0-100)",
        required: true,
      },
    ],
    render: ({ status, args }) => {
      const { location, temperature, condition, humidity } = args;
      return (
        <div className="my-2">
          <WeatherCard
            location={location || "Loading..."}
            temperature={temperature}
            condition={condition}
            humidity={humidity}
          />
          {status === "inProgress" && (
            <p className="text-xs text-zinc-500 mt-2">Fetching weather data...</p>
          )}
        </div>
      );
    },
    handler: async ({ location, temperature, condition, humidity }) => {
      // In a real app, you'd fetch actual weather data here
      return `Weather for ${location}: ${temperature}°F, ${condition}, ${humidity}% humidity`;
    },
  });

  // Stock action - renders a stock card in the chat
  useCopilotAction({
    name: "showStock",
    description: "Display stock/price information. Use this when the user asks about stocks or stock prices.",
    parameters: [
      {
        name: "symbol",
        type: "string",
        description: "Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)",
        required: true,
      },
      {
        name: "companyName",
        type: "string",
        description: "Full company name",
        required: true,
      },
      {
        name: "price",
        type: "number",
        description: "Current stock price (generate a realistic value)",
        required: true,
      },
      {
        name: "change",
        type: "number",
        description: "Price change in dollars (can be negative)",
        required: true,
      },
      {
        name: "changePercent",
        type: "number",
        description: "Price change percentage (can be negative)",
        required: true,
      },
    ],
    render: ({ status, args }) => {
      const { symbol, companyName, price, change, changePercent } = args;
      return (
        <div className="my-2">
          <StockCard
            symbol={symbol || "..."}
            companyName={companyName}
            price={price}
            change={change}
            changePercent={changePercent}
          />
          {status === "inProgress" && (
            <p className="text-xs text-zinc-500 mt-2">Loading stock data...</p>
          )}
        </div>
      );
    },
    handler: async ({ symbol, companyName, price, change, changePercent }) => {
      return `${symbol} (${companyName}): $${price}, change: ${change} (${changePercent}%)`;
    },
  });

  // Task action - renders a task card in the chat
  useCopilotAction({
    name: "createTask",
    description: "Create and display a task card. Use this when the user wants to create a task, todo, or reminder.",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The task title",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "Detailed description of the task",
        required: false,
      },
      {
        name: "priority",
        type: "string",
        description: "Priority level: low, medium, or high",
        required: true,
      },
      {
        name: "dueDate",
        type: "string",
        description: "Due date in a readable format (e.g., 'Tomorrow', 'Jan 25, 2025')",
        required: false,
      },
    ],
    render: ({ status, args }) => {
      const { title, description, priority, dueDate } = args;
      return (
        <div className="my-2">
          <TaskCard
            title={title || "New Task"}
            description={description}
            priority={priority as "low" | "medium" | "high"}
            dueDate={dueDate}
            status={status === "complete" ? "pending" : "in_progress"}
          />
          {status === "inProgress" && (
            <p className="text-xs text-zinc-500 mt-2">Creating task...</p>
          )}
        </div>
      );
    },
    handler: async ({ title, description, priority, dueDate }) => {
      return `Task created: "${title}" with ${priority} priority${dueDate ? `, due ${dueDate}` : ""}`;
    },
  });
}
