"use client";

interface StockCardProps {
  symbol: string;
  companyName?: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export function StockCard({ symbol, companyName, price, change, changePercent }: StockCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 max-w-sm">
      <div className="flex justify-between items-start">
        <div>
          <span className="bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded text-sm font-mono font-bold">
            {symbol}
          </span>
          {companyName && (
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">{companyName}</p>
          )}
        </div>
        <div className={`text-2xl ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "📈" : "📉"}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold text-zinc-900 dark:text-white">
          {price !== undefined ? `$${price.toFixed(2)}` : "Loading..."}
        </p>
        {change !== undefined && changePercent !== undefined && (
          <p className={`text-sm mt-1 font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}{change.toFixed(2)} ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
          </p>
        )}
      </div>
    </div>
  );
}
