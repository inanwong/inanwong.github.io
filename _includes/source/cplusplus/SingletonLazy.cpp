// 单例模式：类创建自己的唯一实例
class Singleton
{
public:
	static Singleton* GetInstance()
	{
		if (NULL == m_pSingleton)
		{
			m_pSingleton = new Singleton();
		}
	}
protected:
	Singleton() {};
	virtual ~Singleton() {};
private:
	static Singleton* m_pSingleton;
};