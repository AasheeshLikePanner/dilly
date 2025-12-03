# @dilly/emoji-dock

Mac OS dock-style emoji feedback component for React with smooth animations.

## Installation

```bash
npm install @dilly/emoji-dock
```

## Usage

```tsx
import { EmojiDock } from '@dilly/emoji-dock';

function App() {
  return (
    <EmojiDock
      apiKey="ak_live_your_api_key"
      onSuccess={(data) => console.log('Feedback submitted!', data)}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | No* | Your Dilly API key for production use |
| `showcaseMode` | `boolean` | No | Set to `true` for demo mode (no API calls) |
| `onSuccess` | `(data: any) => void` | No | Callback when feedback is successfully submitted |
| `onError` | `(error: Error) => void` | No | Callback when an error occurs |

*Required for production use, optional for showcase mode

## Showcase Mode

Perfect for demos and testing:

```tsx
<EmojiDock showcaseMode={true} />
```

## License

MIT
