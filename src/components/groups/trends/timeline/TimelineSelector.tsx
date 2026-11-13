import { useEffect, useState } from "react";
import { GroupTimelineDisplayType } from "./GroupTimelineTrends";
import { useTranslation } from "react-i18next";
import { Select } from "../../../generic/Select.tsx";

export function TimelineSelector({
  onRangeSelected = () => {},
  defaultOption = 0,
}: {
  onRangeSelected?: (type: GroupTimelineDisplayType) => void;
  defaultOption?: number;
}) {
  const { t } = useTranslation();

  const options = [
    {
      name: t("trends.periodic"),
      value: GroupTimelineDisplayType.Periodic,
    },
    {
      name: t("trends.cumulative"),
      value: GroupTimelineDisplayType.Cumulative,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const selectOption = (index: number) => {
    setSelectedOption(index);
    if (onRangeSelected) {
      const option = options[index];
      onRangeSelected(option.value);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      selectOption(defaultOption ?? 0);
    }, 1);
  }, []);

  return (
    <Select
      label={t("a11y.trends.displayType")}
      hideLabel
      className="w-auto"
      value={selectedOption}
      onChange={selectOption}
      buttonClassName="md:min-w-32 text-sm md:text-base gap-2"
      optionClassName="text-sm md:text-base py-2"
      options={options.map((it, i) => ({ value: i, label: it.name }))}
    />
  );
}
