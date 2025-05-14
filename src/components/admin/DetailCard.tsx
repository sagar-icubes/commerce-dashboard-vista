
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-1 py-2 border-b last:border-0">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="text-gray-900">{value || "—"}</dd>
  </div>
);

interface DetailCardProps {
  title: string;
  items: {
    label: string;
    value: React.ReactNode;
  }[];
}

const DetailCard: React.FC<DetailCardProps> = ({ title, items }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <DetailItem key={i} label={item.label} value={item.value} />
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
