'use client';

import { LabelList, Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import { calculatePercentage } from '@/lib/utils';
import type { Summary } from '@/types';

type ChartProps = {
  summary: Summary[];
  usedSpace: number;
};

export default function Chart({ summary, usedSpace }: ChartProps) {
  const chartData = [
    ...summary.map((data, idx) => ({
      title: data.title.toLowerCase(),
      size: data.size,
      percentage: Math.round(calculatePercentage(data.size, usedSpace)),
      fill: `var(--color-chart-${idx + 1})`,
    })),
  ];

  const chartConfig = {
    photos: {
      label: 'Photos',
      color: 'var(--color-chart-1)',
    },
    documents: {
      label: 'Documents',
      color: 'var(--color-chart-2)',
    },
    videos: {
      label: 'Videos',
      color: 'var(--color-chart-3)',
    },
    audios: {
      label: 'Audios',
      color: 'var(--color-chart-4)',
    },
    others: {
      label: 'Others',
      color: 'var(--color-chart-5)',
    },
  } satisfies ChartConfig;

  return (
    <Card className="xl:flex-2/5 flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>Storage Usage</CardTitle>
        <CardDescription>Current space usage by file type</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="title"
              innerRadius={50}
              outerRadius={100}
              strokeWidth={2}
            >
              <LabelList
                dataKey="title"
                stroke="none"
                fontSize={11}
                className="fill-background"
                formatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />
            </Pie>
            <ChartLegend
              className="translate-y-4 flex-wrap gap-2 justify-center"
              content={<ChartLegendContent nameKey="title" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-xs text-muted-foreground leading-none">
          Showing total storage distribution for all files
        </div>
      </CardFooter>
    </Card>
  );
}
