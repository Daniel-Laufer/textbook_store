import requests
import json
from bs4 import BeautifulSoup


baseURL ="https://student.utm.utoronto.ca/calendar/"
page = requests.get("{}depart_list.pl".format(baseURL))

soup = BeautifulSoup(page.content, 'html.parser')



departmentExtensions = [tag['href'] for tag in soup.find_all('a', href=True) if "newdep_detail.pl?Depart=" in tag['href'] ]

output = {}
allCourses = []
uniqueCourseCodes = set()
for extension in departmentExtensions:
    depPage = requests.get("{}{}".format(baseURL, extension))
    depSoup = BeautifulSoup(depPage.content, 'html.parser')
    courses = [text for text in depSoup.findAll(text=True) if len(text) > 3 and text.isupper() and any(char.isdigit() for char in text)]
    if(len(courses) > 0):
        uniqueCourseCodes.add(courses[0][0:3])
    allCourses.extend(courses)

# with open("courses.txt", "w") as f:
    # for course in allCourses:
        # f.write("{}\n".format(course))

# with open("coursePrefixes.txt", "w") as f:
    # for prefix in uniqueCourseCodes:
    #     f.write("{}\n".format(prefix))



output['courses'] = allCourses
output['coursePrefixes'] = list(uniqueCourseCodes)

with open("./courses.js", "w") as f:
    f.write("export default")
    json.dump(output, f)

