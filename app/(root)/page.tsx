import Link from 'next/link';
import Image from 'next/image';

import { calculatePercentage, convertFileSize, formatDateTime, getUsageSummary } from '@/lib/utils';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { Card, CardContent } from '@/components/ui/card';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import Chart from '@/components/layout/Chart';
import { FileDocument, Summary } from '@/types';
import ActionDropdown from '@/components/files/ActionDropdown';
import Thumbnail from '@/components/files/Thumbnail';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function Dashboard() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10, sort: '$updatedAt-desc' }),
    getTotalSpaceUsed(),
  ]);

  const usedSpaceFormatted = convertFileSize(totalSpace.used);
  const totalSpaceFormatted = convertFileSize(totalSpace.all);

  const usageSummary = getUsageSummary(totalSpace);
  return (
    <div className="mx-auto space-y-6">
      <h1 className="h1">My Files</h1>
      <section>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex xl:flex-3/5 flex-col gap-6">
            {/* Storage Progress */}
            <Card className="p-4">
              <Progress value={calculatePercentage(totalSpace.used, totalSpace.all)}>
                <ProgressLabel className="space-x-1">
                  <span className="h2">{usedSpaceFormatted}</span>
                  <span className="subtitle-1"> | </span>
                  <span className="subtitle-1">{totalSpaceFormatted}</span>
                </ProgressLabel>
                <ProgressValue />
              </Progress>
            </Card>
            {/* Usage Summary */}
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {usageSummary.map((summary: Summary) => (
                <Link href={summary.url} key={summary.title}>
                  <Card>
                    <CardContent className="flex flex-col items-center">
                      <Image
                        src={summary.icon}
                        height="36"
                        width="36"
                        alt="Summary Icon"
                        className="h-auto"
                      />
                      <h4 className="body-1 py-2 font-medium">{summary.title}</h4>
                      <h5 className="text-[11px]">{convertFileSize(summary.size) || 0}</h5>
                      <h5 className="text-[10px]">{formatDateTime(summary.latestDate)}</h5>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </ul>
          </div>
          {/* Chart */}
          <Chart summary={usageSummary} usedSpace={totalSpace.used} />
        </div>
      </section>

      <section className="dashboard-recent-files">
        <h2 className="h3 xl:h2 text-light-100">Recent files</h2>
        {files?.rows?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                {['Name', 'Last Modified', 'Size', 'Type', ''].map((title) => (
                  <TableHead key={title} className="text-light-200 text-base font-medium">
                    {title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.rows.map((file: FileDocument) => (
                <TableRow key={file.$id}>
                  <TableCell className="flex items-center gap-3">
                    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
                    <Link
                      href={file.url}
                      target="_blank"
                      className="font-medium hover:text-brand-100"
                    >
                      {file.name}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDateTime(file.$updatedAt)}</TableCell>
                  <TableCell>{convertFileSize(file.size)}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>
                    <ActionDropdown file={file} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
}
