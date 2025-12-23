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

const failure = {
    "success": true,
    "result": {
        "sdkHttpResponse": {
            "headers": {
                "access-control-allow-origin": "chrome-extension://lkekbahdjglgekldimbndoiamhgikcbe",
                "access-control-expose-headers": "vary,vary,vary,content-encoding,date,server,content-length",
                "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
                "content-encoding": "gzip",
                "content-length": "315",
                "content-type": "application/json; charset=UTF-8",
                "date": "Tue, 23 Dec 2025 20:41:43 GMT",
                "server": "scaffolding on HTTPServer2",
                "server-timing": "gfet4t7; dur=8030",
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
                            "text": "{\n\"quiz\": [\n  null\n]\n}"
                        }
                    ],
                    "role": "model"
                },
                "finishReason": "STOP",
                "index": 0
            }
        ],
        "modelVersion": "gemini-2.5-flash",
        "responseId": "h_5KabClJv_K_uMPopv44AI",
        "usageMetadata": {
            "promptTokenCount": 304,
            "candidatesTokenCount": 13,
            "totalTokenCount": 1857,
            "promptTokensDetails": [
                {
                    "modality": "TEXT",
                    "tokenCount": 304
                }
            ],
            "thoughtsTokenCount": 1540
        }
    }
}

// const test = {
//     "success": true,
//     "result": "```json\n{\n  \"quiz\": [\n    {\n      \"q_text\": \"A smart home assistant agent is designed to learn user preferences for lighting and temperature, and then automatically adjust the environment to maximize user comfort. Describe a specific scenario where this agent, despite consistently making decisions that seem locally optimal for comfort (based on learned preferences), could be considered *irrational* from a broader perspective. Explain your reasoning by referencing the core definition of an AI agent's rationality.\",\n      \"opts\": [],\n      \"ans\": \"\",\n      \"type\": \"saq\",\n      \"expl\": \"An AI agent is rational if it acts in such a way as to achieve the best outcome, or the best expected outcome, given its percepts and its knowledge. If the smart home agent always maximizes comfort based on learned preferences without considering external factors, it could be irrational from a broader perspective. For example, if it consistently sets the temperature to a comfortable 22°C and maintains bright lighting even when the user is away for several hours or during peak energy consumption times, it is being irrational. Its actions might maximize comfort (when a user is present and awake), but they are not maximizing the agent's overall performance measure which typically includes factors like energy efficiency and cost reduction (unless explicitly excluded). A truly rational agent would factor in these broader implications, perhaps by inferring the user's presence or optimizing for comfort *while* minimizing energy waste.\"\n    },\n    {\n      \"q_text\": \"Breadth-First Search (BFS) is known to be an optimal search algorithm under specific conditions. Imagine a student claims that BFS is *always* optimal because it explores states level by level, ensuring the shortest path in terms of the number of steps. Identify the critical condition(s) under which BFS guarantees optimality. Then, construct a simple graph search problem where BFS finds a goal state but does *not* find the optimal (cheapest) path, providing a brief justification.\",\n      \"opts\": [],\n      \"ans\": \"\",\n      \"type\": \"saq\",\n      \"expl\": \"BFS guarantees optimality (finding the shortest path or cheapest path to a goal) specifically when all step costs (edge weights) are uniform and positive. In this scenario, the first goal node found at the shallowest depth will indeed correspond to the path with the minimum number of steps, and thus the minimum total cost.\\n\\nHowever, BFS is not optimal when step costs are non-uniform. Consider the following graph:\\nStart (S) -> A (cost 1)\\nStart (S) -> B (cost 10)\\nA -> Goal (G) (cost 100)\\nB -> Goal (G) (cost 1)\\n\\nBFS would explore S, then A and B at depth 1. It would then explore G from A at depth 2 (Path S-A-G, total cost 1 + 100 = 101). Since G is a goal, BFS would terminate and return this path. However, the path S-B-G (total cost 10 + 1 = 11) is significantly cheaper. BFS fails to find the optimal path here because it prioritizes fewer steps over cheaper steps when costs are not uniform.\"\n    }\n  ]\n}\n```"
// }

const test = {
    "success": true,
    "result": "```json\n{\n  \"quiz\": [\n    {\n      \"q_text\": \"A self-driving car agent has a clearly defined performance measure: minimize travel time, maximize safety, and minimize fuel consumption. If the agent is approaching a traffic light that just turned red, but instead of braking, it slightly accelerates and veers into a less-used side street, which of the following conditions would make this action *rational*?\",\n      \"opts\": [\n        \"A) The agent's internal navigation model predicts that the side street, despite being longer, will allow it to bypass a known, significant traffic jam further ahead, ultimately leading to a lower overall travel time and fuel consumption.\",\n        \"B) The agent's sensors are malfunctioning, causing it to incorrectly perceive the traffic light as green.\",\n        \"C) The agent is programmed with a fixed rule to always explore alternative routes whenever a red light is encountered, regardless of traffic conditions.\",\n        \"D) The agent's programmer designed it to occasionally take 'spontaneous' actions to mimic human unpredictability.\"\n      ],\n      \"ans\": \"A) The agent's internal navigation model predicts that the side street, despite being longer, will allow it to bypass a known, significant traffic jam further ahead, ultimately leading to a lower overall travel time and fuel consumption.\",\n      \"type\": \"mcq\",\n      \"expl\": \"A rational agent chooses actions that are expected to maximize its performance measure, given the percept sequence to date and its internal knowledge. In this scenario, the agent is making a predictive, informed decision based on its model of the world (traffic patterns) to achieve its long-term goals (minimize travel time and fuel) even if it deviates from an immediate, seemingly optimal action (stopping at a red light). Options B, C, and D describe situations that are either due to malfunction, arbitrary rules, or non-goal-oriented behavior, none of which align with the definition of a rational agent.\"\n    },\n    {\n      \"q_text\": \"Breadth-First Search (BFS) is described as an optimal search algorithm in certain contexts. Explain a practical scenario where a different complete search algorithm, like Iterative Deepening Depth-First Search (IDDFS), might be a more suitable choice than BFS, even if both would find an optimal solution. Justify your answer by comparing their practical implications for resource usage.\",\n      \"opts\": null,\n      \"ans\": \"BFS is optimal for finding the shallowest (and thus shortest/cheapest path if step costs are uniform) goal state and is complete. Its primary practical limitation is its space complexity, which is exponential ($O(b^d)$, where 'b' is the branching factor and 'd' is the depth of the solution). In contrast, IDDFS is also complete and optimal (under uniform step costs) but has a space complexity of only $O(bd)$ because it re-explores nodes rather than storing all explored layers simultaneously. Therefore, IDDFS would be preferred over BFS in scenarios where memory is a critical constraint, and the search space is very large and deep (e.g., solving an N-puzzle with a high N, or navigating extremely large game trees), as BFS would quickly exhaust available memory. While IDDFS might re-explore nodes and have a higher time complexity in some cases, its memory efficiency makes it a more feasible option for practical problems with limited computational resources.\",\n      \"type\": \"saq\",\n      \"expl\": \"This question requires an understanding of both completeness and optimality, but more importantly, an analytical comparison of the practical trade-offs between algorithms. While both BFS and IDDFS are complete and optimal under uniform step costs, their differing space complexities lead to different practical applications. BFS's exponential space usage makes it impractical for very large search spaces, highlighting the importance of considering resource constraints (like memory) beyond just theoretical optimality when choosing an algorithm.\"\n    }\n  ]\n}\n```"
}

const firstWorkingReturn = {
    "quiz": [
        {
            "q_text": "A self-driving car acts as an AI agent. Consider a scenario where the car approaches an intersection, its sensors detect a child unexpectedly running into the road from the left, and simultaneously, a truck is approaching rapidly from the right. The car's primary goal is to minimize harm. Describe how the concept of a 'rational agent' applies to the car's decision-making in this situation, specifically discussing the interplay between its percepts, knowledge, and the action it chooses to take.",
            "opts": null,
            "ans": "A rational agent chooses actions that are expected to maximize its performance measure (minimize harm in this case) given the percept sequence to date and its built-in knowledge. In this scenario, the car's percepts are the child and the truck. Its knowledge includes traffic laws, physics, and ethical programming (prioritizing human life, minimizing damage). A rational decision would involve quickly evaluating the expected outcomes of various actions (e.g., swerve left, swerve right, brake hard, accelerate) and selecting the action that, based on its model of the world and its current percepts, has the highest probability of minimizing harm, even if no ideal outcome exists. This requires a robust internal model and the ability to act under severe time constraints and uncertainty.",
            "type": "saq",
            "expl": "This question requires students to apply the definition of a rational agent to a complex, real-world scenario. It moves beyond simple recall by asking for an analysis of how percepts, internal knowledge, and the performance measure interact to dictate a rational action in a situation with conflicting inputs and ethical considerations."
        },
        {
            "q_text": "A robot is tasked with finding the shortest path from its current location to a charging station in a grid-based environment where each movement between adjacent cells costs the same (e.g., 1 unit). Which of the following statements best explains why Breadth-First Search (BFS) is considered an optimal algorithm for this problem, and what condition ensures its completeness?",
            "opts": [
                "A) BFS is optimal because it always expands the node closest to the goal first, and it is complete because it uses a heuristic function to guide its search.",
                "B) BFS is optimal because it explores all nodes at a given depth before moving to the next depth, thus guaranteeing the discovery of the shallowest (and shortest) path first. It is complete if the search space is finite and contains no infinite paths.",
                "C) BFS is optimal because it re-evaluates paths using dynamic programming, ensuring the most efficient route. It is complete because it prunes redundant branches effectively.",
                "D) BFS is optimal because it prioritizes paths with the lowest total cost from the start node, and it is complete because it explores all possible paths until the goal is found, regardless of space size."
            ],
            "ans": "B",
            "type": "mcq",
            "expl": "BFS is optimal for unweighted graphs (or graphs with uniform edge costs) because its layer-by-layer exploration guarantees that the first path found to the goal will be one with the minimum number of edges, hence the shortest path. It is complete because it systematically explores the search space level by level, ensuring that if a solution exists in a finite graph (without infinite loops or paths), it will eventually be found. Option A incorrectly attributes heuristic search characteristics to BFS. Option C describes mechanisms not central to BFS's optimality. Option D incorrectly simplifies its completeness condition."
        }
    ]
}

let extracted_json = test.result;
// console.log(extracted_json);
const start = extracted_json.indexOf("{")
if (start != -1){
    // extracted_json = extracted_json.substring(start + 1);
    for(let i = extracted_json.length; i > 0; i--){
        if(extracted_json[i] == "}"){
            extracted_json = extracted_json.substring(start, i+1);
            break;
        } 
    }
}

const json_obj = JSON.parse(extracted_json);
console.log(json_obj.quiz);
// console.log(json_obj[0].opts)
const builder = new FormBuilder();
const generator = new AIQuizGenerator(qfact, builder, json_obj.quiz);
generator.generateQuiz();  
