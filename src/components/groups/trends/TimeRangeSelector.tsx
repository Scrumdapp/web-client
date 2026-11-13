import { useEffect, useState } from "react";
import { toScrumdappDate } from "../../../js/utils/scrumdappDate";
import { getWeekStart } from "../../../js/utils/timeUtils";
import { useTranslation } from "react-i18next";
import { Select } from "../../generic/Select.tsx";

export function TimeRangeSelector({
  onRangeSelected = () => {},
  defaultOption = 0,
}: {
  onRangeSelected?: (start: string, end: string) => void;
  defaultOption?: number;
}) {
  const { t } = useTranslation();

  const options = [
    {
      name: t("trends.twoweeks"),
      from: () =>
        getWeekStart(new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000)),
      to: () => new Date(),
    },
    {
      name: t("trends.sixmonths"),
      from: () =>
        getWeekStart(
          new Date(new Date().getTime() - 6 * 4 * 7 * 24 * 60 * 60 * 1000),
        ),
      to: () => new Date(),
    },
  ];
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const selectOption = (index: number) => {
    setSelectedOption(index);
    if (onRangeSelected) {
      const option = options[index];
      onRangeSelected(
        toScrumdappDate(option.from()),
        toScrumdappDate(option.to()),
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      selectOption(defaultOption ?? 0);
    }, 1);
  }, []);

  return (
    <Select
      label={t("a11y.trends.timeRange")}
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
