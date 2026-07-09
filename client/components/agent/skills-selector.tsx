'use client';

const skills = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
  'Prisma',
  'Docker',
  'AWS',
  'AI',
  'LangChain',
  'Python',
];

interface Props {
  value: string[];
  onChange: (
    skills: string[],
  ) => void;
}

export function SkillsSelector({
  value,
  onChange,
}: Props) {
  function toggleSkill(
    skill: string,
  ) {
    if (
      value.includes(skill)
    ) {
      onChange(
        value.filter(
          s => s !== skill,
        ),
      );
    } else {
      onChange([
        ...value,
        skill,
      ]);
    }
  }

  return (
    <div className="space-y-3">

      <p className="text-sm font-medium">
        Skills
      </p>

      <div className="flex flex-wrap gap-2">

        {skills.map(skill => (

          <button
            key={skill}
            type="button"
            onClick={() =>
              toggleSkill(skill)
            }
            className={`rounded-full border px-4 py-2 text-sm transition

            ${
              value.includes(skill)
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'hover:bg-muted'
            }`}
          >
            {skill}
          </button>

        ))}

      </div>

    </div>
  );
}