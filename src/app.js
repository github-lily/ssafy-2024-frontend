const chatContainer = document.getElementById("chat-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");

// Create a message bubble
function createMessageBubble(content, sender = "user") {
  const wrapper = document.createElement("div");
  wrapper.classList.add("mb-6", "flex", "items-start", "space-x-3");



  // Avatar
  // 공통 프로필 아이콘 디자인 
  const avatar = document.createElement("div");
  avatar.classList.add(
    "w-10",
    "h-10",
    "rounded-full",
    "flex-shrink-0",
    "flex",
    "items-center",
    "justify-center",
    "font-bold",
    "text-white",
    "overflow-hidden", //이미지가 둥글게 보이게 하기
  );

  // 개별 프로필 아이콘 디자인
  if (sender === "assistant") {
    avatar.classList.add("bg-gradient-to-br", "from-green-400", "to-green-600");

    // 노트봇 이미지 아이콘
    const botImg = document.createElement("img");
    img.src = "./assets/images/노트봇 아이콘.png";
    img.alt = "노트봇 아이콘";
    img.classList.add("w-8", "h-8");
    avatar.appendChild(botImg);
  } else {
    avatar.classList.add("bg-gradient-to-br", "from-blue-500", "to-blue-700");
    
    const userImg = document.createElement("img");
    img.src = "./assets/images/유저 아이콘.png";
    img.alt = "유저 아이콘";
    img.classList.add("w-8", "h-8");
    avatar.appendChild(userImg);
  }

  // Bubble
  // 공통 말풍선 디자인
  const bubble = document.createElement("div");
  bubble.classList.add(
    "max-w-full",
    "md:max-w-2xl",
    "p-3",
    "rounded-lg",
    "whitespace-pre-wrap",
    "leading-relaxed",
    "shadow-sm"
  );

  // 개별 말풍선 디자인
  if (sender === "assistant") {
    bubble.classList.add("bg-gray-200", "text-gray-900");
  } else {
    bubble.classList.add("bg-blue-600", "text-white");
  }

  bubble.textContent = content;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  return wrapper;
}

// Scroll to bottom
function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Simulate assistant response
// 기본으로 들어갈 문구 resolve에 추가 가능
function getAssistantResponse(userMessage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("" + userMessage);
    }, 1500);
  });
}

// Handle form submission
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // User message
  chatContainer.appendChild(createMessageBubble(message, "user"));
  userInput.value = "";
  scrollToBottom();

  // Assistant response
  const response = await getAssistantResponse(message);
  chatContainer.appendChild(createMessageBubble(response, "assistant"));
  scrollToBottom();
});
