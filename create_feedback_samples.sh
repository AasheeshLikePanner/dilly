#!/bin/bash

# Feedback Sample Data Generator
# This script creates 30 realistic feedback entries using the API

API_KEY="ak_live_a764f706715d498c80380327.14c8a9d0c56243d78cbff6f9dd4ae020"
API_URL="http://localhost:3000/api/feedback"

echo "🚀 Starting to create 30 sample feedback entries..."
echo "=================================================="

# Sample 1: Emoji - Living Dock - Positive
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 10,
    "comment": "Absolutely love the new dark mode! The design is perfect.",
    "emoji": "🔥",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Living Dock",
    "context": "Post-feature launch feedback on settings page",
    "metadata": {
      "page_url": "/settings/appearance",
      "browser": "Chrome 120",
      "os": "macOS 14.1",
      "session_duration": 245
    }
  }'

echo -e "\n✅ Sample 1 created\n"
sleep 0.5

# Sample 2: Slider - Modern Range - High rating
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 9,
    "comment": "Great experience overall, very smooth and intuitive!",
    "source": "mobile-app",
    "component_name": "slider",
    "component_variant": "Modern Range",
    "context": "In-app NPS survey after 7 days of usage",
    "metadata": {
      "device": "iPhone 13 Pro",
      "app_version": "2.1.0",
      "session_count": 15,
      "user_plan": "pro"
    }
  }'

echo -e "\n✅ Sample 2 created\n"
sleep 0.5

# Sample 3: Form - Quick Comment - Bug report
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "comment": "The export button is not working on Safari. Getting a 404 error.",
    "source": "web",
    "component_name": "form",
    "component_variant": "Quick Comment",
    "context": "Bug report from dashboard export feature",
    "metadata": {
      "page_url": "/dashboard/analytics",
      "browser": "Safari 16.4",
      "os": "macOS 13.2",
      "error_code": "404"
    }
  }'

echo -e "\n✅ Sample 3 created\n"
sleep 0.5

# Sample 4: Emoji - Deep Soul - Negative
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 2,
    "comment": "Too many bugs, very frustrating experience. Please fix!",
    "emoji": "😡",
    "source": "widget",
    "component_name": "emoji",
    "component_variant": "Deep Soul",
    "context": "Embedded widget on pricing page",
    "metadata": {
      "page_url": "/pricing",
      "referrer": "/features",
      "time_on_page": 45
    }
  }'

echo -e "\n✅ Sample 4 created\n"
sleep 0.5

# Sample 5: Slider - Minimal Line - Medium rating
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 7,
    "comment": "Good product, but needs some improvements in the UI.",
    "source": "web",
    "component_name": "slider",
    "component_variant": "Minimal Line",
    "context": "Dashboard satisfaction survey",
    "metadata": {
      "page_url": "/dashboard",
      "browser": "Firefox 119",
      "screen_resolution": "1920x1080"
    }
  }'

echo -e "\n✅ Sample 5 created\n"
sleep 0.5

# Sample 6: Emoji - Living Dock - Very positive
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 10,
    "emoji": "😍",
    "comment": "This is exactly what I needed! Amazing work!",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Living Dock",
    "context": "Post-purchase satisfaction survey",
    "metadata": {
      "page_url": "/checkout/success",
      "purchase_amount": 99,
      "user_plan": "premium"
    }
  }'

echo -e "\n✅ Sample 6 created\n"
sleep 0.5

# Sample 7: Form - Full Form - Feature request
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "rating": 8,
    "comment": "Would love to see a mobile app version. The web version is great though!",
    "source": "web",
    "component_name": "form",
    "component_variant": "Full Form",
    "context": "Feature request from feedback modal",
    "metadata": {
      "page_url": "/feedback",
      "category": "feature-request",
      "priority": "high"
    }
  }'

echo -e "\n✅ Sample 7 created\n"
sleep 0.5

# Sample 8: Slider - Modern Range - Excellent
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 10,
    "comment": "Best tool I have used for this purpose. Highly recommend!",
    "source": "mobile-app",
    "component_name": "slider",
    "component_variant": "Modern Range",
    "context": "Post-onboarding feedback",
    "metadata": {
      "device": "Samsung Galaxy S23",
      "onboarding_completed": true,
      "time_to_complete": 180
    }
  }'

echo -e "\n✅ Sample 8 created\n"
sleep 0.5

# Sample 9: Emoji - Deep Soul - Neutral
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 5,
    "emoji": "😐",
    "comment": "It is okay, nothing special but gets the job done.",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Deep Soul",
    "context": "Mid-session feedback popup",
    "metadata": {
      "page_url": "/workspace/projects",
      "session_duration": 600
    }
  }'

echo -e "\n✅ Sample 9 created\n"
sleep 0.5

# Sample 10: Form - Quick Comment - Positive
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "rating": 9,
    "comment": "The new analytics dashboard is incredible! Love the charts.",
    "source": "web",
    "component_name": "form",
    "component_variant": "Quick Comment",
    "context": "Analytics page feedback",
    "metadata": {
      "page_url": "/analytics",
      "feature": "charts",
      "browser": "Chrome 120"
    }
  }'

echo -e "\n✅ Sample 10 created\n"
sleep 0.5

# Sample 11: Emoji - Living Dock - Happy
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 8,
    "emoji": "😊",
    "comment": "Really enjoying the updates. Keep up the great work!",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Living Dock",
    "context": "Version 2.0 release feedback",
    "metadata": {
      "version": "2.0.0",
      "previous_version": "1.9.5"
    }
  }'

echo -e "\n✅ Sample 11 created\n"
sleep 0.5

# Sample 12: Slider - Minimal Line - Low
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 3,
    "comment": "Performance is really slow on mobile. Takes forever to load.",
    "source": "mobile-app",
    "component_name": "slider",
    "component_variant": "Minimal Line",
    "context": "Performance feedback survey",
    "metadata": {
      "device": "iPhone 11",
      "load_time": 8500,
      "network": "4G"
    }
  }'

echo -e "\n✅ Sample 12 created\n"
sleep 0.5

# Sample 13: Form - Full Form - Support
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "comment": "How do I export data to CSV? Cannot find the option anywhere.",
    "source": "web",
    "component_name": "form",
    "component_variant": "Full Form",
    "context": "Help request from settings page",
    "metadata": {
      "page_url": "/settings/data",
      "category": "support",
      "urgency": "low"
    }
  }'

echo -e "\n✅ Sample 13 created\n"
sleep 0.5

# Sample 14: Emoji - Deep Soul - Love it
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 10,
    "emoji": "❤️",
    "comment": "This has transformed how we work. Thank you!",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Deep Soul",
    "context": "Team collaboration feature feedback",
    "metadata": {
      "page_url": "/team/workspace",
      "team_size": 12,
      "user_role": "admin"
    }
  }'

echo -e "\n✅ Sample 14 created\n"
sleep 0.5

# Sample 15: Slider - Modern Range - Good
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 8,
    "comment": "Solid product. The integrations work well.",
    "source": "web",
    "component_name": "slider",
    "component_variant": "Modern Range",
    "context": "Integration satisfaction survey",
    "metadata": {
      "integrations_used": ["slack", "github", "jira"],
      "page_url": "/integrations"
    }
  }'

echo -e "\n✅ Sample 15 created\n"
sleep 0.5

# Sample 16: Emoji - Living Dock - Thinking
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 6,
    "emoji": "🤔",
    "comment": "Not sure about the new UI changes. Need time to adapt.",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Living Dock",
    "context": "UI redesign feedback",
    "metadata": {
      "redesign_version": "3.0",
      "previous_user": true
    }
  }'

echo -e "\n✅ Sample 16 created\n"
sleep 0.5

# Sample 17: Form - Quick Comment - Pricing
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "rating": 7,
    "comment": "Pricing is a bit high for small teams, but the value is there.",
    "source": "web",
    "component_name": "form",
    "component_variant": "Quick Comment",
    "context": "Pricing page feedback",
    "metadata": {
      "page_url": "/pricing",
      "team_size": 5,
      "plan_interest": "pro"
    }
  }'

echo -e "\n✅ Sample 17 created\n"
sleep 0.5

# Sample 18: Slider - Minimal Line - Excellent
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 10,
    "comment": "Customer support is outstanding! Resolved my issue in minutes.",
    "source": "mobile-app",
    "component_name": "slider",
    "component_variant": "Minimal Line",
    "context": "Post-support interaction survey",
    "metadata": {
      "ticket_id": "SUP-12345",
      "resolution_time": 8,
      "support_agent": "Sarah"
    }
  }'

echo -e "\n✅ Sample 18 created\n"
sleep 0.5

# Sample 19: Emoji - Deep Soul - Sad
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 4,
    "emoji": "😞",
    "comment": "Missing some key features that competitors have.",
    "source": "widget",
    "component_name": "emoji",
    "component_variant": "Deep Soul",
    "context": "Feature comparison feedback",
    "metadata": {
      "missing_features": ["api_v2", "webhooks"],
      "competitor": "competitor_x"
    }
  }'

echo -e "\n✅ Sample 19 created\n"
sleep 0.5

# Sample 20: Form - Full Form - Documentation
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "rating": 9,
    "comment": "Documentation is comprehensive and well-written. Very helpful!",
    "source": "web",
    "component_name": "form",
    "component_variant": "Full Form",
    "context": "Documentation feedback",
    "metadata": {
      "page_url": "/docs/getting-started",
      "helpful": true,
      "time_spent": 420
    }
  }'

echo -e "\n✅ Sample 20 created\n"
sleep 0.5

# Sample 21: Emoji - Living Dock - Party
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 10,
    "emoji": "🎉",
    "comment": "Just hit our first milestone using this tool!",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Living Dock",
    "context": "Milestone celebration feedback",
    "metadata": {
      "milestone": "1000_users",
      "celebration": true
    }
  }'

echo -e "\n✅ Sample 21 created\n"
sleep 0.5

# Sample 22: Slider - Modern Range - Average
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 6,
    "comment": "Decent tool but has room for improvement in UX.",
    "source": "web",
    "component_name": "slider",
    "component_variant": "Modern Range",
    "context": "UX feedback survey",
    "metadata": {
      "page_url": "/workspace",
      "ux_issues": ["navigation", "search"]
    }
  }'

echo -e "\n✅ Sample 22 created\n"
sleep 0.5

# Sample 23: Form - Quick Comment - Mobile
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "comment": "Please add dark mode to the mobile app!",
    "source": "mobile-app",
    "component_name": "form",
    "component_variant": "Quick Comment",
    "context": "Mobile app feature request",
    "metadata": {
      "device": "Pixel 7",
      "app_version": "1.8.0",
      "feature_request": "dark_mode"
    }
  }'

echo -e "\n✅ Sample 23 created\n"
sleep 0.5

# Sample 24: Emoji - Deep Soul - Star eyes
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 9,
    "emoji": "🤩",
    "comment": "The new dashboard redesign is stunning!",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Deep Soul",
    "context": "Dashboard redesign feedback",
    "metadata": {
      "page_url": "/dashboard/v2",
      "redesign": true,
      "first_impression": "positive"
    }
  }'

echo -e "\n✅ Sample 24 created\n"
sleep 0.5

# Sample 25: Slider - Minimal Line - High
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 9,
    "comment": "Onboarding process was smooth and easy to follow.",
    "source": "web",
    "component_name": "slider",
    "component_variant": "Minimal Line",
    "context": "Onboarding completion survey",
    "metadata": {
      "onboarding_steps": 5,
      "completion_time": 300,
      "skipped_steps": 0
    }
  }'

echo -e "\n✅ Sample 25 created\n"
sleep 0.5

# Sample 26: Form - Full Form - Security
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "rating": 10,
    "comment": "Love the 2FA implementation. Feels very secure.",
    "source": "web",
    "component_name": "form",
    "component_variant": "Full Form",
    "context": "Security feature feedback",
    "metadata": {
      "page_url": "/settings/security",
      "feature": "2fa",
      "enabled": true
    }
  }'

echo -e "\n✅ Sample 26 created\n"
sleep 0.5

# Sample 27: Emoji - Living Dock - Rocket
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 10,
    "emoji": "🚀",
    "comment": "This tool has boosted our productivity by 50%!",
    "source": "web",
    "component_name": "emoji",
    "component_variant": "Living Dock",
    "context": "Productivity impact survey",
    "metadata": {
      "productivity_increase": 50,
      "team_size": 8,
      "industry": "tech"
    }
  }'

echo -e "\n✅ Sample 27 created\n"
sleep 0.5

# Sample 28: Slider - Modern Range - Low
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "slider",
    "rating": 4,
    "comment": "Too expensive for what it offers. Considering alternatives.",
    "source": "web",
    "component_name": "slider",
    "component_variant": "Modern Range",
    "context": "Pricing satisfaction survey",
    "metadata": {
      "current_plan": "pro",
      "price_concern": true,
      "alternatives_considered": ["tool_a", "tool_b"]
    }
  }'

echo -e "\n✅ Sample 28 created\n"
sleep 0.5

# Sample 29: Form - Quick Comment - API
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "form",
    "rating": 8,
    "comment": "API documentation could be better, but the API itself works great!",
    "source": "web",
    "component_name": "form",
    "component_variant": "Quick Comment",
    "context": "API developer feedback",
    "metadata": {
      "page_url": "/docs/api",
      "developer": true,
      "api_usage": "high"
    }
  }'

echo -e "\n✅ Sample 29 created\n"
sleep 0.5

# Sample 30: Emoji - Deep Soul - Thumbs up
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{
    "type": "emoji",
    "rating": 9,
    "emoji": "👍",
    "comment": "Great product, would definitely recommend to others!",
    "source": "widget",
    "component_name": "emoji",
    "component_variant": "Deep Soul",
    "context": "Referral program feedback",
    "metadata": {
      "referrals_made": 3,
      "nps_score": 9,
      "would_recommend": true
    }
  }'

echo -e "\n✅ Sample 30 created\n"

echo "=================================================="
echo "🎉 Successfully created 30 feedback samples!"
echo "=================================================="
