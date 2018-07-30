from collections import defaultdict
from os.path import dirname, join
import weakref
class KeepRefs(object):
    __refs__ = defaultdict(list)
    def __init(self):
        self.__refs__[self.__class__].append(weakref.ref(self))

    @classmethod
    def get_instances(cls):
        for inst_ref in cls.__refs__[cls]:
            inst = inst_ref()
            if inst is not None:
                yield inst

MAIN_QHORD_DIRECTORY=dirname(dirname(__file__))

def full_path(*path):
    return join(MAIN_QHORD_DIRECTORY, *path)
