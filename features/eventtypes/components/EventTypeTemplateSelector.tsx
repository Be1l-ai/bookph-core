"use client";

import { useState } from "react";

import type { EventTypeTemplate } from "@bookph/core/features/eventtypes/lib/templates";
import { EVENT_TYPE_TEMPLATES, getTemplateCategories } from "@bookph/core/features/eventtypes/lib/templates";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Button } from "@bookph/ui/components/button";
import { Label } from "@bookph/ui/components/form";

interface EventTypeTemplateSelectorProps {
  onSelectTemplate: (template: EventTypeTemplate) => void;
}

export function EventTypeTemplateSelector({ onSelectTemplate }: EventTypeTemplateSelectorProps) {
  const { t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getTemplateCategories();

  const templates = selectedCategory
    ? EVENT_TYPE_TEMPLATES.filter((template) => template.category === selectedCategory)
    : EVENT_TYPE_TEMPLATES;

  return (
    <div className="mb-6">
      <Label className="mb-2">{t("event_type_templates")}</Label>
      <p className="text-subtle mb-3 text-sm">{t("use_template_to_get_started")}</p>
      
      <div className="mb-3 flex flex-wrap gap-2">
        <Button
          color="secondary"
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "bg-subtle" : ""}>
          {t("all")}
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            color="secondary"
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-subtle" : ""}>
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelectTemplate(template)}
            className="border-subtle hover:border-emphasis text-left rounded-md border p-3 transition-colors">
            <div className="font-medium">{template.title}</div>
            <div className="text-subtle text-sm">
              {template.length} {t("minutes")} • {template.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
