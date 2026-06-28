export type RobotExpression =
  | 'idle'
  | 'wink'
  | 'coding'
  | 'money'
  | 'cheer'
  | 'sleepy'
  | 'surprised'
  | 'thinking';

interface PixelRobotProps {
  expression?: RobotExpression;
  size?: number;
  className?: string;
}

/** SC 마스코트 (8표정). public/assets/robot/ 의 SVG를 표시한다. */
export function PixelRobot({ expression = 'idle', size = 120, className = '' }: PixelRobotProps) {
  return (
    <img
      src={`/assets/robot/robot-${expression}.svg`}
      alt={`SC 마스코트 ${expression}`}
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'auto', objectFit: 'contain' }}
      draggable={false}
    />
  );
}
