"use client";

import { useState } from "react";
import { useFrontendTool, useHumanInTheLoop, useCopilotReadable } from "@copilotkit/react-core";
import { WeatherCard } from "../components/WeatherCard";
import { StockCard } from "../components/StockCard";
import { TaskCard } from "../components/TaskCard";
import { MeetingConfirmationDialog } from "../components/MeetingConfirmationDialog";
import { ColleagueCard } from "../components/ColleagueCard";
import { MeetingCard } from "../components/MeetingCard";

export function useDemoActions() {
  // ============ READABLE CONTEXT DATA ============

  const [colleagues] = useState([
    { id: 1, name: "John Doe", role: "Developer" },
    { id: 2, name: "Jane Smith", role: "Designer" },
    { id: 3, name: "Bob Wilson", role: "Product Manager" },
  ]);

  const [meetings] = useState([
    { id: 1, title: "Sprint Planning", date: "Monday 10am", attendees: ["John", "Jane"] },
    { id: 2, title: "Design Review", date: "Wednesday 2pm", attendees: ["Jane", "Bob"] },
  ]);

  useCopilotReadable({
    description: "The current user's colleagues with their names and roles",
    value: colleagues,
  });

  useCopilotReadable({
    description: "The user's upcoming scheduled meetings with dates and attendees",
    value: meetings,
  });

  // ============ FRONTEND TOOLS ============

  // Weather action - renders a weather card in the chat
  useFrontendTool({
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
  useFrontendTool({
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
  useFrontendTool({
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

  // human in the loop action for scheduling meetings
  useHumanInTheLoop({
    name: "handleMeeting",
    description: "Handle a meeting by booking or canceling",
    parameters: [
      {
        name: "meeting",
        type: "string",
        description: "The meeting to handle",
        required: true,
      },
      {
        name: "date",
        type: "string",
        description: "The date of the meeting",
        required: true,
      },
      {
        name: "title",
        type: "string",
        description: "The title of the meeting",
        required: true,
      },
    ],
    render: ({ args, respond, status }) => {
      const { meeting, date, title } = args;
      return (
        <MeetingConfirmationDialog
          meeting={meeting}
          date={date}
          title={title}
          onConfirm={() => respond?.('meeting confirmed')}
          onCancel={() => respond?.('meeting canceled')}
        />
      );
    },
  });

  // ============ CONTEXT DATA DISPLAY TOOLS ============

  // Show colleagues - all or filtered by name
  useFrontendTool({
    name: "showColleagues",
    description: "Display colleague information. Use this when the user asks about colleagues, team members, or a specific person.",
    parameters: [
      {
        name: "filterName",
        type: "string",
        description: "Optional: filter to show only colleagues whose name contains this string. Leave empty to show all.",
        required: false,
      },
    ],
    render: ({ args }) => {
      const { filterName } = args;

      if (filterName) {
        const filtered = colleagues.filter(c =>
          c.name.toLowerCase().includes(filterName.toLowerCase())
        );
        if (filtered.length === 1) {
          return <ColleagueCard colleague={filtered[0]} />;
        }
        return <ColleagueCard colleagues={filtered.length > 0 ? filtered : colleagues} />;
      }

      return <ColleagueCard colleagues={colleagues} />;
    },
    handler: async ({ filterName }) => {
      if (filterName) {
        const filtered = colleagues.filter(c =>
          c.name.toLowerCase().includes(filterName.toLowerCase())
        );
        return `Found ${filtered.length} colleague(s) matching "${filterName}"`;
      }
      return `Showing all ${colleagues.length} colleagues`;
    },
  });

  // Show meetings - all or filtered by title/attendee
  useFrontendTool({
    name: "showMeetings",
    description: "Display meeting information. Use this when the user asks about meetings, schedule, or a specific meeting.",
    parameters: [
      {
        name: "filterText",
        type: "string",
        description: "Optional: filter to show only meetings whose title or attendees contain this string. Leave empty to show all.",
        required: false,
      },
    ],
    render: ({ args }) => {
      const { filterText } = args;

      if (filterText) {
        const filtered = meetings.filter(m =>
          m.title.toLowerCase().includes(filterText.toLowerCase()) ||
          m.attendees.some(a => a.toLowerCase().includes(filterText.toLowerCase()))
        );
        if (filtered.length === 1) {
          return <MeetingCard meeting={filtered[0]} />;
        }
        return <MeetingCard meetings={filtered.length > 0 ? filtered : meetings} />;
      }

      return <MeetingCard meetings={meetings} />;
    },
    handler: async ({ filterText }) => {
      if (filterText) {
        const filtered = meetings.filter(m =>
          m.title.toLowerCase().includes(filterText.toLowerCase()) ||
          m.attendees.some(a => a.toLowerCase().includes(filterText.toLowerCase()))
        );
        return `Found ${filtered.length} meeting(s) matching "${filterText}"`;
      }
      return `Showing all ${meetings.length} upcoming meetings`;
    },
  });
}
