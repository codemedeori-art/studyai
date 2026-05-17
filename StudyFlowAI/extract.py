import os
import re

parts = [
    r"d:\new ai\STUDYFLOW-COMPLETE-CODE-PART1.txt",
    r"d:\new ai\STUDYFLOW-COMPLETE-CODE-PART2.txt",
    r"d:\new ai\STUDYFLOW-COMPLETE-CODE-PART3.txt",
    r"d:\new ai\STUDYFLOW-COMPLETE-CODE-PART4.txt"
]

base_dir = r"d:\new ai"

for part in parts:
    try:
        with open(part, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Use regex to find all file sections
            blocks = re.split(r'={30,}\nFILE \d+: [^\n]+\n={30,}\nPath: ', content)
            
            for block in blocks[1:]:
                # The first line is the path
                path_end = block.find('\n')
                rel_path = block[:path_end].strip()
                
                file_content = block[path_end:].strip()
                
                # replace 'StudyFlowAI/' with ''
                if rel_path.startswith('StudyFlowAI/'):
                    rel_path = rel_path[len('StudyFlowAI/'):]
                
                full_path = os.path.join(base_dir, 'StudyFlowAI', rel_path)
                
                print(f"Extracting to: {full_path}")
                os.makedirs(os.path.dirname(full_path), exist_ok=True)
                
                with open(full_path, 'w', encoding='utf-8') as out_f:
                    out_f.write(file_content)
    except Exception as e:
        print(f"Error processing {part}: {e}")
