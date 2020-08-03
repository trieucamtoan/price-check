import re, subprocess, os
if os.path.exists("ip_config.txt"):
    os.remove("ip_config.txt")
f = open("ip_config.txt", "w")

# ps = subprocess.Popen(["ip", "a"], stdout=subprocess.PIPE)
# output = subprocess.check_output(('grep', 'docker0'), stdin=ps.stdout)
cmd = "ip a | grep docker"
ps = subprocess.Popen(cmd,shell=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
output = ps.communicate()[0]
decoded = output.decode()
# result = re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', decoded).group()
f.write(decoded)
print(decoded)
f.close()