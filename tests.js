import { json } from "zod";
import { GeminiService } from "./classes/aiClass/gemini.js";
import { AIQuizGenerator } from "./classes/QuizClass/AIGeneratedQuiz.js";
import { FormBuilder } from "./classes/FormClasses/FormBuilder.js";
import { QuestionFactory as qfact } from "./classes/QuestionClasses/QuestionFactory.js";
async function testGemini(){
    const GEMINI_API_KEY = "fakeKey"; 
    const ai = GeminiService.getInstance(GEMINI_API_KEY);

    var response = await ai.handleGeminiQuery("Hello");
    console.assert(response.includes("Error: "))
}
// "{
//     \"question\": 1, 
//     \"q_text\": \"Which of the following best explains why Breadth-First Search (BFS) is considered an optimal search algorithm in certain scenarios?\", 
//     \"opts\": [\"BFS is optimal because it explores nodes based on a heuristic function, always selecting the path with the lowest estimated cost to the goal.\", \"BFS is optimal because it expands all nodes at a given depth level before moving to the next, guaranteeing that the first path found to the goal in an unweighted graph is also the shortest path in terms of the number of edges.\", \"BFS is optimal because it always expands the node with the lowest path cost from the start node, making it suitable for weighted graphs.\", \"BFS is optimal because it requires the least amount of memory, making it efficient for large state spaces.\"], 
//     \"ans\": \"BFS is optimal because it expands all nodes at a given depth level before moving to the next, guaranteeing that the first path found to the goal in an unweighted graph is also the shortest path in terms of the number of edges.\", 
//     \"type\": \"MCQ\", 
//     \"expl\": \"BFS is considered optimal for finding the shortest path (in terms of the number of edges) in unweighted graphs. This is because it systematically explores the search space level by level. By expanding all nodes at depth 'd' before moving to depth 'd+1', the first time BFS discovers a goal node, it is guaranteed that this path is the one with the fewest number of edges from the start node. It's crucial to understand that this optimality does not extend to weighted graphs or scenarios where path cost is determined by factors other than the number of steps.\"
// }"
// "[\n  
//     {\n    
//         \"question\": \"Question 1\",\n   
//         \"q_text\": \"A common misconception is that a rational agent simply 'does the right thing'. Explain the comprehensive definition of a rational agent in AI, detailing the four critical elements it considers to make the 'right' decision and how these elements contribute to maximizing expected performance, especially in environments with uncertainty.\",\n    
//         \"opts\": [],\n    
//         \"ans\": \"A rational agent is one that chooses actions that are expected to maximize its performance measure, given the percept sequence to date and its built-in knowledge. The four critical elements are: 1. Performance Measure: Defines the criteria for success. 2. Prior Knowledge: What the agent knows about the environment. 3. Available Actions: The set of actions it can perform. 4. Percept Sequence: Everything the agent has perceived so far. The agent doesn't just do the 'right thing' deterministically, but rather acts to maximize expected utility based on its understanding and available information, even when outcomes are uncertain.\",\n    
//         \"type\": \"short_answer\",\n    \"expl\": \"Rationality in AI is about *expected* maximization of a performance measure, not perfect knowledge or absolute rightness. It's a calculation based on available information, prior knowledge, and possible actions, aimed at optimal long-term outcomes.\"\n  
//     },
//     \n{\n    
//         \"question\": \"Question 2\",\n    
//         \"q_text\": \"Breadth-First Search (BFS) is considered an optimal search algorithm. Elaborate on the specific conditions and crucial assumptions that must be met for BFS to guarantee optimality, and discuss why these conditions are essential for it to find the shortest path in terms of *cost*, not just number of steps.\",\n    
//         \"opts\": [],\n    
//         \"ans\": \"BFS is optimal in finding the shortest path *in terms of the number of edges* (or shortest path in an unweighted graph). For it to be optimal in terms of *cost*, a crucial assumption is that all step costs (edge weights) are uniform and equal (e.g., 1). If step costs vary, BFS does not guarantee optimality because it expands nodes layer by layer, finding the path with the fewest steps first, which may not be the path with the least cumulative cost. For example, a path with 2 steps each costing 100 might be found before a path with 3 steps each costing 1, if the 3-step path starts later in the BFS expansion.\",\n    
//         \"type\": \"short_answer\",\n    \"expl\": \"BFS's optimality is specifically for *unweighted* graphs or when all edge costs are uniform. If costs vary, a different algorithm like Uniform Cost Search (UCS) or A* is needed to guarantee optimal *cost* paths.\"\n  
//     }
// \n]"
// "[\n  
//     {\n    
//         \"question\": 1,\n    
//         \"q_text\": \"In the context of Artificial Intelligence, an agent is often described by its ability to perceive its environment and act upon that environment. Which of the following statements most accurately reflects the comprehensive role and definition of an AI agent?\",\n   
//          \"opts\": [\n      \"A program that solely calculates optimal moves for a game based on pre-programmed rules.\",\n      \"A system component that executes predefined commands without any feedback loop.\",\n      \"An entity that perceives its environment through sensors and acts upon that environment through effectors to achieve specified goals, guided by its internal programming and knowledge.\",\n      \"A database that stores information about the environment, providing data to other components for decision-making.\"\n    ],\n    
//          \"ans\": \"An entity that perceives its environment through sensors and acts upon that environment through effectors to achieve specified goals, guided by its internal programming and knowledge.\",\n    
//          \"type\": \"MCQ\",\n    
//          \"expl\": \"The definition of an AI agent is fundamentally centered on the perceive-act cycle. It's not just about executing commands or calculating moves, but about the holistic interaction with an environment through sensors (for perception) and effectors (for action) with the aim of achieving specific objectives, integrating its internal state and knowledge.\"\n  },\n  {\n    \"question\": 2,\n    \"q_text\": \"An AI agent is often described as 'rational'. Beyond simply achieving its goals, explain what 'rationality' precisely entails for an AI agent, considering factors like its knowledge, percept sequence, and the performance measure. How does this differ fundamentally from a colloquial understanding of human rationality?\",\n    \"opts\": [],\n    \"ans\": \"For an AI agent, rationality means that for each possible percept sequence, the agent chooses an action that is expected to maximize its performance measure, given the evidence provided by the percept sequence and whatever built-in knowledge the agent has. It's about 'expected optimal behavior' given incomplete information and specific goals, rather than guaranteed success. This fundamentally differs from colloquial human rationality, which is often influenced by emotions, cognitive biases, bounded rationality (limitations in computation/information), and subjective values, rather than a strict, objective performance maximization.\",\n    \"type\": \"Short Answer\",\n    \"expl\": \"This explanation emphasizes the objective, calculated nature of AI rationality, its dependence on maximizing a defined performance measure under uncertainty (expected value), and how it is distinct from human rationality which is often subjective, emotional, and limited by cognitive constraints. It highlights that AI rationality is about 'doing the right thing' given what it knows, even if that doesn't lead to perfect outcomes due to environmental uncertainty.\"\n  
//     }\n
// ]"
function testJson(){
    // const obj3 = "{\"question\": 1, \"q_text\": \"Which of the following best explains why Breadth-First Search (BFS) is considered an optimal search algorithm in certain scenarios?\", \"opts\": [\"BFS is optimal because it explores nodes based on a heuristic function, always selecting the path with the lowest estimated cost to the goal.\", \"BFS is optimal because it expands all nodes at a given depth level before moving to the next, guaranteeing that the first path found to the goal in an unweighted graph is also the shortest path in terms of the number of edges.\", \"BFS is optimal because it always expands the node with the lowest path cost from the start node, making it suitable for weighted graphs.\", \"BFS is optimal because it requires the least amount of memory, making it efficient for large state spaces.\"], \"ans\": \"BFS is optimal because it expands all nodes at a given depth level before moving to the next, guaranteeing that the first path found to the goal in an unweighted graph is also the shortest path in terms of the number of edges.\", \"type\": \"MCQ\", \"expl\": \"BFS is considered optimal for finding the shortest path (in terms of the number of edges) in unweighted graphs. This is because it systematically explores the search space level by level. By expanding all nodes at depth 'd' before moving to depth 'd+1', the first time BFS discovers a goal node, it is guaranteed that this path is the one with the fewest number of edges from the start node. It's crucial to understand that this optimality does not extend to weighted graphs or scenarios where path cost is determined by factors other than the number of steps.\"}"
    const obj4 = "[\n  {\n    \"question\": \"Question 1\",\n    \"q_text\": \"A common misconception is that a rational agent simply 'does the right thing'. Explain the comprehensive definition of a rational agent in AI, detailing the four critical elements it considers to make the 'right' decision and how these elements contribute to maximizing expected performance, especially in environments with uncertainty.\",\n    \"opts\": [],\n    \"ans\": \"A rational agent is one that chooses actions that are expected to maximize its performance measure, given the percept sequence to date and its built-in knowledge. The four critical elements are: 1. Performance Measure: Defines the criteria for success. 2. Prior Knowledge: What the agent knows about the environment. 3. Available Actions: The set of actions it can perform. 4. Percept Sequence: Everything the agent has perceived so far. The agent doesn't just do the 'right thing' deterministically, but rather acts to maximize expected utility based on its understanding and available information, even when outcomes are uncertain.\",\n    \"type\": \"short_answer\",\n    \"expl\": \"Rationality in AI is about *expected* maximization of a performance measure, not perfect knowledge or absolute rightness. It's a calculation based on available information, prior knowledge, and possible actions, aimed at optimal long-term outcomes.\"\n  },\n  {\n    \"question\": \"Question 2\",\n    \"q_text\": \"Breadth-First Search (BFS) is considered an optimal search algorithm. Elaborate on the specific conditions and crucial assumptions that must be met for BFS to guarantee optimality, and discuss why these conditions are essential for it to find the shortest path in terms of *cost*, not just number of steps.\",\n    \"opts\": [],\n    \"ans\": \"BFS is optimal in finding the shortest path *in terms of the number of edges* (or shortest path in an unweighted graph). For it to be optimal in terms of *cost*, a crucial assumption is that all step costs (edge weights) are uniform and equal (e.g., 1). If step costs vary, BFS does not guarantee optimality because it expands nodes layer by layer, finding the path with the fewest steps first, which may not be the path with the least cumulative cost. For example, a path with 2 steps each costing 100 might be found before a path with 3 steps each costing 1, if the 3-step path starts later in the BFS expansion.\",\n    \"type\": \"short_answer\",\n    \"expl\": \"BFS's optimality is specifically for *unweighted* graphs or when all edge costs are uniform. If costs vary, a different algorithm like Uniform Cost Search (UCS) or A* is needed to guarantee optimal *cost* paths.\"\n  }\n]"
    const json_obj = JSON.parse(obj4);
    // console.log(json_obj[0]);
    // const json_question = JSON.parse(json_obj[0]);
    // const factory = new QuestionFactory();
    const builder = new FormBuilder();
    const generator = new AIQuizGenerator(qfact, builder, json_obj);
    generator.generateQuiz();  
    // const test = QuizGenerator.parseJsonQuestions(json_obj);
    // console.log(test);
}
// testJson();

const result = {
    "sdkHttpResponse": {
        "headers": {
            "access-control-allow-origin": "chrome-extension://lkekbahdjglgekldimbndoiamhgikcbe",
            "access-control-expose-headers": "vary,vary,vary,content-encoding,date,server,content-length",
            "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
            "content-encoding": "gzip",
            "content-length": "1469",
            "content-type": "application/json; charset=UTF-8",
            "date": "Mon, 22 Dec 2025 08:42:11 GMT",
            "server": "scaffolding on HTTPServer2",
            "server-timing": "gfet4t7; dur=8390",
            "vary": "Origin, X-Origin, Referer",
            "x-content-type-options": "nosniff",
            "x-frame-options": "SAMEORIGIN",
            "x-xss-protection": "0"
        }
    },
    "candidates": [
        {
            "content": {
                "parts": [
                    {
                        "text": "[\n  {\n    \"question\": 1,\n    \"q_text\": \"In the context of Artificial Intelligence, an agent is often described by its ability to perceive its environment and act upon that environment. Which of the following statements most accurately reflects the comprehensive role and definition of an AI agent?\",\n    \"opts\": [\n      \"A program that solely calculates optimal moves for a game based on pre-programmed rules.\",\n      \"A system component that executes predefined commands without any feedback loop.\",\n      \"An entity that perceives its environment through sensors and acts upon that environment through effectors to achieve specified goals, guided by its internal programming and knowledge.\",\n      \"A database that stores information about the environment, providing data to other components for decision-making.\"\n    ],\n    \"ans\": \"An entity that perceives its environment through sensors and acts upon that environment through effectors to achieve specified goals, guided by its internal programming and knowledge.\",\n    \"type\": \"MCQ\",\n    \"expl\": \"The definition of an AI agent is fundamentally centered on the perceive-act cycle. It's not just about executing commands or calculating moves, but about the holistic interaction with an environment through sensors (for perception) and effectors (for action) with the aim of achieving specific objectives, integrating its internal state and knowledge.\"\n  },\n  {\n    \"question\": 2,\n    \"q_text\": \"An AI agent is often described as 'rational'. Beyond simply achieving its goals, explain what 'rationality' precisely entails for an AI agent, considering factors like its knowledge, percept sequence, and the performance measure. How does this differ fundamentally from a colloquial understanding of human rationality?\",\n    \"opts\": [],\n    \"ans\": \"For an AI agent, rationality means that for each possible percept sequence, the agent chooses an action that is expected to maximize its performance measure, given the evidence provided by the percept sequence and whatever built-in knowledge the agent has. It's about 'expected optimal behavior' given incomplete information and specific goals, rather than guaranteed success. This fundamentally differs from colloquial human rationality, which is often influenced by emotions, cognitive biases, bounded rationality (limitations in computation/information), and subjective values, rather than a strict, objective performance maximization.\",\n    \"type\": \"Short Answer\",\n    \"expl\": \"This explanation emphasizes the objective, calculated nature of AI rationality, its dependence on maximizing a defined performance measure under uncertainty (expected value), and how it is distinct from human rationality which is often subjective, emotional, and limited by cognitive constraints. It highlights that AI rationality is about 'doing the right thing' given what it knows, even if that doesn't lead to perfect outcomes due to environmental uncertainty.\"\n  }\n]"
                    }
                ],
                "role": "model"
            },
            "finishReason": "STOP",
            "index": 0
        }
    ],
    "modelVersion": "gemini-2.5-flash",
    "responseId": "YwRJaeayGemi_uMP4angmQ8",
    "usageMetadata": {
        "promptTokenCount": 174,
        "candidatesTokenCount": 573,
        "totalTokenCount": 1703,
        "promptTokensDetails": [
            {
                "modality": "TEXT",
                "tokenCount": 174
            }
        ],
        "thoughtsTokenCount": 956
    }
}
// console.log(result.candidates[0].content.parts[0].text);
// testGemini();
